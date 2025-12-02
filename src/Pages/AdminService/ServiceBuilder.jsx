import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaPlus, FaTrash, FaSave, FaTimes, FaChevronUp, FaChevronDown, 
  FaImage, FaGripLines, FaEye, FaEdit 
} from "react-icons/fa";
import "./ServiceBuilder.css";

// 2. IMPORT COMPONENT HIỂN THỊ (PREVIEW)
import IntroSection from "../ServiceBlock/IntroSection";
import DefinitionSection from "../ServiceBlock/DefinitionSection";
import PricingSection from "../ServiceBlock/PricingSection";
import TaskTabsSection from "../ServiceBlock/TaskTabsSection";
import ProcessSection from "../ServiceBlock/ProcessSection";
import BookingSection from "../ServiceBlock/BookingSection";

// --- COMPONENT CON: DYNAMIC FIELD (FIXED: Support Primitive Arrays & Objects) ---
const DynamicField = ({ fieldKey, fieldConfig, value, onChange, onUpload }) => {
  
  // 1. Input Text / Number
  if (["text", "number"].includes(fieldConfig.type)) {
    return (
      <div className="form-group">
        <label className="label">
          {fieldConfig.label} {fieldConfig.required && <span style={{color:'red'}}>*</span>}
        </label>
        <input
          className="input-field"
          type={fieldConfig.type}
          value={value !== undefined && value !== null ? value : ""}
          onChange={(e) => onChange(fieldKey, fieldConfig.type === "number" ? Number(e.target.value) : e.target.value)}
          placeholder={fieldConfig.placeholder}
        />
      </div>
    );
  }

  // 2. Textarea / RichText
  if (["textarea", "richtext"].includes(fieldConfig.type)) {
    return (
      <div className="form-group">
        <label className="label">{fieldConfig.label} {fieldConfig.required && <span style={{color:'red'}}>*</span>}</label>
        <textarea
          className="textarea-field"
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        />
      </div>
    );
  }

  // 3. Select Box
  if (fieldConfig.type === "select") {
    return (
      <div className="form-group">
        <label className="label">{fieldConfig.label}</label>
        <select
          className="select-field"
          value={value || ""}
          onChange={(e) => onChange(fieldKey, e.target.value)}
        >
          <option value="">-- Chọn --</option>
          {fieldConfig.options?.map((opt, index) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={index} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  // 4. Image Upload
  if (fieldConfig.type === "image") {
    return (
      <div className="form-group">
        <label className="label">{fieldConfig.label}</label>
        {!value ? (
          <div className="upload-box">
            <label style={{ cursor: "pointer", display: 'block' }}>
              <FaImage size={30} color="#9ca3af" style={{ display: 'block', margin: '0 auto 5px' }} />
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Tải ảnh lên</span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={async (e) => {
                  if (onUpload) {
                    const url = await onUpload(e.target.files[0]);
                    if (url) onChange(fieldKey, url);
                  }
                }}
              />
            </label>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <img src={value} alt="Preview" className="preview-img" style={{ maxWidth: '100%', height: 'auto', objectFit:'cover' }} />
            <button className="btn-remove-img" onClick={() => onChange(fieldKey, "")}>
              Xóa ảnh
            </button>
          </div>
        )}
      </div>
    );
  }

  // 5. Array (List Items) - FIXED LOGIC
  if (fieldConfig.type === "array") {
    const items = Array.isArray(value) ? value : [];

    const handleAddItem = () => {
        // Kiểm tra schema
        const hasSubFields = fieldConfig.itemSchema && Object.keys(fieldConfig.itemSchema).length > 0;
        
        // Detect Primitive vs Object
        const isLikelyPrimitive = items.length > 0 && typeof items[0] !== 'object';
        
        if (!isLikelyPrimitive && hasSubFields) {
            const newItem = {};
            Object.keys(fieldConfig.itemSchema).forEach(key => {
                if (key === 'number' || key === 'step_number' || key === 'order') {
                    newItem[key] = items.length + 1; 
                } else {
                    newItem[key] = ""; 
                }
            });
            onChange(fieldKey, [...items, newItem]);
        } else {
            // Thêm string rỗng cho mảng đơn giản
            onChange(fieldKey, [...items, ""]); 
        }
    };

    return (
      <div className="form-group">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: 'center' }}>
          <label className="label" style={{ margin: 0 }}>{fieldConfig.label}</label>
          <button className="btn-add-item" onClick={handleAddItem}>
            + Thêm dòng
          </button>
        </div>
        <div className="array-box">
          {items.map((item, idx) => (
            <div key={idx} className="array-row">
              <button
                className="btn-remove-item"
                onClick={() => onChange(fieldKey, items.filter((_, i) => i !== idx))}
              >
                <FaTrash size={14} />
              </button>
              
              {fieldConfig.itemSchema && Object.entries(fieldConfig.itemSchema).map(([subKey, subConfig]) => {
                // --- FIXED DISPLAY LOGIC ---
                const isPrimitive = typeof item !== 'object' || item === null;
                const valToPass = isPrimitive ? item : item[subKey];

                return (
                  <DynamicField
                    key={subKey}
                    fieldKey={subKey}
                    fieldConfig={subConfig}
                    value={valToPass} // Hiển thị đúng string
                    onUpload={onUpload}
                    onChange={(k, v) => {
                      const newItems = [...items];
                      if (isPrimitive) {
                        newItems[idx] = v; // Update trực tiếp string
                      } else {
                        newItems[idx] = { ...newItems[idx], [k]: v };
                      }
                      onChange(fieldKey, newItems);
                    }}
                  />
                );
              })}
            </div>
          ))}
          {items.length === 0 && (
            <p style={{ fontSize: "13px", color: "#9ca3af", textAlign: "center", padding: 10 }}>
              Chưa có dữ liệu
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// --- MAIN COMPONENT: SERVICE BUILDER ---
const ServiceBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [schemas, setSchemas] = useState({});
  
  const [basicInfo, setBasicInfo] = useState({ 
    name: "", 
    slug: "", 
    description: "", 
    original_price: 0, 
    duration: 60      
  });

  const [blocks, setBlocks] = useState([]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // --- LOAD DATA ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);

    const fetchData = async () => {
      try {
        // 1. Get Schema
        const schemaRes = await fetch("https://hello-node-render.onrender.com/api/admin/services/block-schemas", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const schemaData = await schemaRes.json();
        
        if (schemaData.success) {
           const finalSchemas = schemaData.data.schemas || schemaData.data || {};
           setSchemas(finalSchemas);
        }

        // 2. Get Service Data
        if (isEditMode) {
          const serviceRes = await fetch(`https://hello-node-render.onrender.com/api/admin/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const serviceData = await serviceRes.json();
          const service = serviceData?.data?.service;
          
          if (service) {
            setBasicInfo({
              name: service.name || "",
              slug: service.slug || "",
              description: service.description || "",
              original_price: service.base_price || 0,
              duration: service.duration_minutes || 60,
            });
            
            let loadedBlocks = [];
            if (typeof service.layout_config === 'string') {
                try { loadedBlocks = JSON.parse(service.layout_config); } catch(e){}
            } else {
                loadedBlocks = service.layout_config || [];
            }
            setBlocks(loadedBlocks.map((b) => ({ ...b, _tempId: b._tempId || Math.random().toString() })));
          }
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  // --- AUTO SYNC PRICING TO BOOKING ---
  useEffect(() => {
    const pricingBlock = blocks.find(b => b.type === "pricing");
    const bookingBlock = blocks.find(b => b.type === "booking");

    if (pricingBlock && bookingBlock) {
      const subServices = pricingBlock.data.subservices || [];
      
      // Lấy danh sách ID
      const newOptions = subServices.map(s => s.id).filter(id => id); 

      const formSchema = bookingBlock.data.form_schema || [];
      const fieldIndex = formSchema.findIndex(f => f.field_name === "subservice_id");

      if (fieldIndex !== -1) {
        const currentField = formSchema[fieldIndex];
        if (JSON.stringify(currentField.options) !== JSON.stringify(newOptions)) {
          console.log("Auto-syncing Pricing IDs to Booking form...");
          
          const newBlocks = blocks.map(b => {
            if (b._tempId === bookingBlock._tempId) {
              const newSchema = [...b.data.form_schema];
              newSchema[fieldIndex] = {
                ...newSchema[fieldIndex],
                options: newOptions // Lưu mảng string ID
              };
              return { ...b, data: { ...b.data, form_schema: newSchema } };
            }
            return b;
          });
          setBlocks(newBlocks);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  // --- UPLOAD IMAGE ---
  const handleUploadImage = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("https://hello-node-render.onrender.com/api/upload/image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      return data?.data?.url || data?.url;
    } catch (error) {
      alert("Lỗi upload: " + error.message);
      return null;
    }
  };

  // --- ACTIONS ---
  const addBlock = (type) => {
    const schema = schemas[type];
    if(!schema) return;

    const newBlock = {
      _tempId: Date.now().toString(),
      type: type,
      data: JSON.parse(JSON.stringify(schema.defaultData)),
    };
    setBlocks([...blocks, newBlock]);
    setActiveBlockId(newBlock._tempId);
    setIsMenuOpen(false);
    setIsPreviewMode(false);
  };

  const deleteBlock = (tempId, e) => {
    e.stopPropagation();
    if (window.confirm("Xóa block này?")) {
      setBlocks(blocks.filter((b) => b._tempId !== tempId));
      if (activeBlockId === tempId) setActiveBlockId(null);
    }
  };

  const moveBlock = (index, direction, e) => {
    e.stopPropagation();
    const newBlocks = [...blocks];
    if (direction === "up" && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === "down" && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setBlocks(newBlocks);
  };

  const updateBlockData = (tempId, fieldKey, value) => {
    setBlocks(blocks.map((b) => (b._tempId === tempId ? { ...b, data: { ...b.data, [fieldKey]: value } } : b)));
  };

  // --- SAVE DATA ---
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Vui lòng đăng nhập!");

    if (!basicInfo.name || !basicInfo.name.trim()) return alert("Nhập tên dịch vụ!");

    const payload = {
      name: basicInfo.name.trim(),
      description: basicInfo.description,
      base_price: Number(basicInfo.original_price),
      duration_minutes: Number(basicInfo.duration),
      ...(basicInfo.slug && { slug: basicInfo.slug.trim() }), 
      layout_config: blocks.map(({ _tempId, ...rest }) => rest)
    };

    const url = isEditMode 
      ? `https://hello-node-render.onrender.com/api/admin/services/${id}` 
      : `https://hello-node-render.onrender.com/api/admin/services`;

    try {
      const res = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(`Lỗi: ${result.message || "Không thể lưu"}`);
      } else {
        alert("Lưu thành công!");
        if (!isEditMode && result.data?.service?._id) {
          navigate(`/admin/services/${result.data.service._id}/builder`, { replace: true });
        }
      }
    } catch (err) {
      alert("Lỗi kết nối server.");
    }
  };

  // --- PREVIEW RENDER ---
  const renderBlockPreview = (block) => {
    const props = { data: block.data };
    switch (block.type) {
      case "intro": return <IntroSection {...props} />;
      case "definition": return <DefinitionSection {...props} />;
      case "pricing": return <PricingSection {...props} />;
      case "task_tab": return <TaskTabsSection {...props} />;
      case "process": return <ProcessSection {...props} />;
      case "booking": return <BookingSection {...props} />;
      default: return <div style={{padding:20, border:'1px dashed #ccc'}}>Unknown Block</div>;
    }
  };

  if (loading) return <div style={{ padding: 20, textAlign: 'center' }}>Đang tải dữ liệu...</div>;

  const activeBlock = blocks.find((b) => b._tempId === activeBlockId);
  const activeSchema = activeBlock ? schemas[activeBlock.type] : null;

  return (
    <div className="builder-wrapper">
      
      {/* PANEL TRÁI */}
      {!isPreviewMode && (
        <div className="builder-left">
          <div className="left-header-area">
            <div className="header-row">
              <h2 className="page-title">{isEditMode ? "Sửa Dịch Vụ" : "Tạo Dịch Vụ"}</h2>
              <div className="btn-group">
                <button className="btn-preview" onClick={() => setIsPreviewMode(true)}><FaEye /> Xem</button>
                <button className="btn-save" onClick={handleSave}><FaSave /> Lưu</button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Tên Dịch Vụ</label>
              <input type="text" className="input-basic" placeholder="VD: Dọn dẹp nhà..."
                value={basicInfo.name} onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })} />
            </div>

            <div className="input-group" style={{marginTop: '10px'}}>
              <label className="input-label">Mô tả ngắn</label>
              <textarea 
                className="input-basic" 
                rows={3}
                placeholder="Mô tả tóm tắt về dịch vụ..."
                value={basicInfo.description} 
                onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })} 
                style={{ resize: 'vertical', minHeight: '60px' }}
              />
            </div>

            <div className="input-row" style={{marginTop: '10px'}}>
              <div className="input-group">
                <label className="input-label">Giá (VNĐ)</label>
                <input type="number" className="input-basic" value={basicInfo.original_price} onChange={(e) => setBasicInfo({ ...basicInfo, original_price: e.target.value })} />
              </div>
              <div className="input-group">
                <label className="input-label">Thời gian (Phút)</label>
                <input type="number" className="input-basic" value={basicInfo.duration} onChange={(e) => setBasicInfo({ ...basicInfo, duration: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="block-list">
            {blocks.length === 0 && <div style={{textAlign:'center', color:'#999', padding:20, border:'2px dashed #eee', borderRadius:8}}>Chưa có nội dung.</div>}
            {blocks.map((block, index) => {
              const schema = schemas[block.type] || { name: block.type };
              return (
                <div key={block._tempId} className={`block-item ${activeBlockId === block._tempId ? "active" : ""}`} onClick={() => setActiveBlockId(block._tempId)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
                    <FaGripLines color="#b2bec3" />
                    <div>
                      <div className="block-name">{schema.name}</div>
                      <div className="block-desc">{block.data.title || block.data.heading || "Không tiêu đề"}</div>
                    </div>
                  </div>
                  <div className="action-group">
                    <FaChevronUp className="icon-action" onClick={(e) => moveBlock(index, "up", e)} />
                    <FaChevronDown className="icon-action" onClick={(e) => moveBlock(index, "down", e)} />
                    <FaTrash className="icon-action delete" onClick={(e) => deleteBlock(block._tempId, e)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="add-area">
            <button className="btn-add" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaPlus /> Thêm Block
            </button>
            {isMenuOpen && (
              <div style={{
                  position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                  width: '260px', background: 'white', borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)', border: '1px solid #e5e7eb',
                  zIndex: 9999, maxHeight: '400px', overflowY: 'auto', padding: '8px 0'
                }}>
                <div style={{padding:'8px 16px', fontSize:'11px', fontWeight:'700', color:'#9ca3af', textTransform:'uppercase'}}>Chọn loại nội dung</div>
                {Object.values(schemas).map((schema) => (
                  <button key={schema.type} onClick={() => addBlock(schema.type)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px',
                      background: 'white', border: 'none', cursor: 'pointer', borderBottom: '1px solid #f9fafb'
                    }}
                    onMouseOver={(e)=>e.currentTarget.style.background='#eff6ff'}
                    onMouseOut={(e)=>e.currentTarget.style.background='white'}
                  >
                    <div style={{fontWeight:'600', color:'#1f2937', fontSize:'14px'}}>{schema.name}</div>
                    <div style={{fontSize:'12px', color:'#6b7280', marginTop:'2px'}}>{schema.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PANEL PHẢI */}
      {isPreviewMode ? (
        <div className="preview-container">
          <div style={{ padding: '15px 25px', borderBottom: '1px solid #e5e7eb', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, zIndex:50 }}>
             <h3 style={{ margin: 0, fontSize: '16px', fontWeight:'700' }}>Xem Trước Giao Diện</h3>
             <button onClick={() => setIsPreviewMode(false)} style={{padding:'8px 16px', cursor:'pointer', border:'1px solid #d1d5db', background:'white', borderRadius:'6px', display:'flex', gap:6, alignItems:'center', fontWeight:'500', fontSize:'13px'}}>
                <FaEdit /> Quay lại sửa
             </button>
          </div>
          <div style={{paddingBottom: 50}}>
             {blocks.length === 0 
                ? <p style={{textAlign:'center', padding:50, color:'#9ca3af'}}>Chưa có nội dung</p> 
                : blocks.map(block => (
                    <div key={block._tempId}>
                        {renderBlockPreview(block)}
                    </div>
                  ))
             }
          </div>
        </div>
      ) : (
        activeBlock && activeSchema && activeSchema.fields ? (
          <div className="builder-right">
            <div className="right-header">
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight:'700', color:'#111827' }}>{activeSchema.name}</h3>
                <FaTimes className="close-icon" onClick={() => setActiveBlockId(null)} />            </div>
            <div className="right-content">
              {Object.entries(activeSchema.fields).map(([fieldKey, config]) => (
                <DynamicField 
                  key={fieldKey} 
                  fieldKey={fieldKey} 
                  fieldConfig={config} 
                  value={activeBlock.data[fieldKey]}
                  onUpload={handleUploadImage}
                  onChange={(key, val) => updateBlockData(activeBlock._tempId, key, val)} 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="builder-right" style={{ justifyContent: "center", alignItems: "center", display:'flex', flexDirection:'column', gap:15 }}>
            <div style={{width:80, height:80, borderRadius:'50%', background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <FaEdit size={30} color="#d1d5db"/>
            </div>
            <p style={{color:'#6b7280', fontSize:'15px'}}>Chọn một block bên trái để chỉnh sửa nội dung</p>
          </div>
        )
      )}
    </div>
  );
};

export default ServiceBuilder;