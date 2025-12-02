// src/Pages/AdminBooking/AdminServiceCreate.jsx
import React, { useEffect, useState } from "react";
import "./AdminServiceCreate.css";

/* =======================================================
   AUTO-IMPORT BLOCKS USING require.context (Webpack)
   ======================================================= */
const context = require.context("../ServiceBlock", false, /\.jsx$/);

const BLOCK_COMPONENTS = {};
context.keys().forEach((key) => {
  const fileName = key.replace("./", "").replace(".jsx", ""); 
  const type = fileName.replace("Section", "").toLowerCase(); 
  BLOCK_COMPONENTS[type] = context(key).default;
});

/* =======================================================
   MAIN COMPONENT
   ======================================================= */
const AdminServiceCreate = () => {
  const [loading, setLoading] = useState(true);
  const [schemas, setSchemas] = useState({});
  const [blockTypes, setBlockTypes] = useState([]);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    base_price: "",
    duration_minutes: "",
    layout_config: []
  });

  /* =======================================================
     1. Fetch block schemas
     ======================================================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://hello-node-render.onrender.com/api/admin/services/block-schemas", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setSchemas(data.data.schemas);
        setBlockTypes(Object.values(data.data.block_types));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        setLoading(false);
      });
  }, []);

  /* =======================================================
     2. Add block
     ======================================================= */
  const addBlock = (type) => {
    const schema = schemas[type];
    if (!schema) return;

    setServiceForm((prev) => ({
      ...prev,
      layout_config: [
        ...prev.layout_config,
        {
          type,
          data: JSON.parse(JSON.stringify(schema.defaultData))
        }
      ]
    }));
  };

  /* =======================================================
     3. Remove block
     ======================================================= */
  const removeBlock = (index) => {
    const updated = [...serviceForm.layout_config];
    updated.splice(index, 1);

    setServiceForm((prev) => ({
      ...prev,
      layout_config: updated
    }));
  };

  /* =======================================================
     4. Move block ↑ ↓
     ======================================================= */
  const moveBlock = (from, to) => {
    const blocks = [...serviceForm.layout_config];
    if (to < 0 || to >= blocks.length) return;

    [blocks[from], blocks[to]] = [blocks[to], blocks[from]];

    setServiceForm((prev) => ({ ...prev, layout_config: blocks }));
  };

  /* =======================================================
     5. Update block data
     ======================================================= */
  const updateBlockData = (index, newData) => {
    const blocks = [...serviceForm.layout_config];
    blocks[index].data = newData;

    setServiceForm((prev) => ({ ...prev, layout_config: blocks }));
  };

  /* =======================================================
     6. Submit
     ======================================================= */
  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    const payload = {
      name: serviceForm.name,
      description: serviceForm.description,
      base_price: Number(serviceForm.base_price),
      duration_minutes: Number(serviceForm.duration_minutes),
      layout_config: serviceForm.layout_config
    };

    fetch("https://hello-node-render.onrender.com/api/admin/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((out) => {
        if (out.success) alert("Tạo dịch vụ thành công!");
        else alert("Lỗi: " + out.message);
      });
  };

  if (loading) return <p>Đang tải schema...</p>;

  return (
    <div className="admin-service-container">
      <h1 className="title">Tạo Dịch Vụ Mới</h1>

      {/* ============================
          THÔNG TIN CƠ BẢN
      ============================ */}
      <div className="section">
        <label>Tên dịch vụ</label>
        <input
          className="field-input"
          value={serviceForm.name}
          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
        />

        <label>Mô tả</label>
        <textarea
          className="field-textarea"
          value={serviceForm.description}
          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
        />

        <label>Giá cơ bản</label>
        <input
          className="field-input"
          type="number"
          value={serviceForm.base_price}
          onChange={(e) => setServiceForm({ ...serviceForm, base_price: e.target.value })}
        />

        <label>Thời gian (phút)</label>
        <input
          className="field-input"
          type="number"
          value={serviceForm.duration_minutes}
          onChange={(e) =>
            setServiceForm({ ...serviceForm, duration_minutes: e.target.value })
          }
        />
      </div>

      {/* ============================
          DANH SÁCH BLOCK
      ============================ */}
      <h2 className="sub-title">Chọn Block</h2>

      <div className="block-select-list">
        {blockTypes.map((t) => (
          <button key={t} className="add-block-btn" onClick={() => addBlock(t)}>
            + {schemas[t]?.name}
          </button>
        ))}
      </div>

      {/* ============================
          RENDER DYNAMIC BLOCK
      ============================ */}
      {serviceForm.layout_config.map((block, index) => {
        const BlockComponent = BLOCK_COMPONENTS[block.type];

        if (!BlockComponent)
          return <p key={index}>Không tìm thấy component cho block "{block.type}"</p>;

        return (
          <div key={index} className="block-wrapper">
            <div className="block-header">
              <h3>{schemas[block.type].name}</h3>

              <div className="block-actions">
                <button onClick={() => moveBlock(index, index - 1)}>↑</button>
                <button onClick={() => moveBlock(index, index + 1)}>↓</button>
                <button className="delete-btn" onClick={() => removeBlock(index)}>
                  X
                </button>
              </div>
            </div>

            <BlockComponent
              data={block.data}
              onChange={(newData) => updateBlockData(index, newData)}
            />
          </div>
        );
      })}

      {/* ============================
          SUBMIT
      ============================ */}
      <button className="submit-btn" onClick={handleSubmit}>
        Tạo dịch vụ
      </button>
    </div>
  );
};

export default AdminServiceCreate;
