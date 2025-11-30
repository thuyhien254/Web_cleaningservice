// src/Pages/AdminService/BlockSchemas.js

export const BLOCK_TYPES = {
  INTRO: 'intro',
  DEFINITION: 'definition',
  PRICING: 'pricing',
  TASK_TAB: 'task_tab',
  PROCESS: 'process',
  BOOKING: 'booking'
};

export const BLOCK_SCHEMAS = {
  // --- 1. INTRO (Giới thiệu) ---
  // Data khớp: { title, banner_image_url }
  [BLOCK_TYPES.INTRO]: {
    type: BLOCK_TYPES.INTRO,
    name: 'Giới thiệu (Banner)',
    description: 'Banner đầu trang với ảnh nền',
    fields: {
      title: { // SQL dùng 'title'
        type: 'text', 
        label: 'Tiêu đề chính (H1)', 
        required: true, 
        placeholder: 'VD: Dịch vụ dọn nhà...' 
      },
      banner_image_url: { // SQL dùng 'banner_image_url'
        type: 'image', 
        label: 'Ảnh nền Banner', 
        required: true 
      }
    },
    defaultData: { title: 'Dịch vụ vệ sinh chuyên nghiệp', banner_image_url: '' }
  },

  // --- 2. DEFINITION (Lợi ích) ---
  // Data khớp: { title, content }
  [BLOCK_TYPES.DEFINITION]: {
    type: BLOCK_TYPES.DEFINITION,
    name: 'Mô tả / Lợi ích',
    description: 'Đoạn văn bản giới thiệu chi tiết',
    fields: {
      title: { type: 'text', label: 'Tiêu đề mục', required: true },
      content: { type: 'richtext', label: 'Nội dung (HTML)', required: true }
    },
    defaultData: { title: 'Về dịch vụ', content: '<p>Mô tả chi tiết...</p>' }
  },

  // --- 3. PRICING (Bảng giá) ---
  // Data khớp: { service_title, note, subservices: [{id, subservice_title, price}] }
  [BLOCK_TYPES.PRICING]: {
    type: BLOCK_TYPES.PRICING,
    name: 'Bảng giá',
    description: 'Danh sách các gói giá',
    fields: {
      service_title: { type: 'text', label: 'Tiêu đề bảng giá', required: true },
      note: { type: 'textarea', label: 'Ghi chú (Lưu ý)' },
      subservices: {
        type: 'array',
        label: 'Các gói dịch vụ',
        itemSchema: {
          id: { type: 'text', label: 'ID gói (VD: 2br)', required: true },
          subservice_title: { type: 'text', label: 'Tên gói', required: true }, // SQL dùng 'subservice_title'
          price: { type: 'number', label: 'Giá tiền (VNĐ)', required: true }
        }
      }
    },
    defaultData: { service_title: 'Bảng giá dịch vụ', subservices: [], note: '' }
  },

  // --- 4. TASK TAB (Tab công việc) ---
  // Data khớp: { title, tabs: [{tab_title, description, image_url}] }
  [BLOCK_TYPES.TASK_TAB]: {
    type: BLOCK_TYPES.TASK_TAB,
    name: 'Tabs Công việc',
    description: 'Các tab nội dung chi tiết',
    fields: {
      title: { type: 'text', label: 'Tiêu đề chung', required: true }, // SQL dùng 'title'
      tabs: {
        type: 'array',
        label: 'Danh sách Tabs',
        itemSchema: {
          tab_title: { type: 'text', label: 'Tên Tab', required: true }, // SQL dùng 'tab_title'
          description: { type: 'richtext', label: 'Nội dung chi tiết', required: true }, // SQL dùng 'description'
          image_url: { type: 'image', label: 'Ảnh minh họa', required: true }
        }
      }
    },
    defaultData: { title: 'Chi tiết công việc', tabs: [] }
  },

  // --- 5. PROCESS (Quy trình) ---
  // Data khớp: { title, steps: [{number, step_title, description, image_url}] }
  [BLOCK_TYPES.PROCESS]: {
    type: BLOCK_TYPES.PROCESS,
    name: 'Quy trình',
    description: 'Các bước thực hiện (Timeline)',
    fields: {
      title: { type: 'text', label: 'Tiêu đề quy trình', required: true }, // SQL dùng 'title'
      steps: {
        type: 'array',
        label: 'Các bước thực hiện',
        itemSchema: {
          number: { type: 'number', label: 'Số thứ tự', required: true },
          step_title: { type: 'text', label: 'Tên bước', required: true }, // SQL dùng 'step_title'
          description: { type: 'textarea', label: 'Mô tả bước', required: true },
          image_url: { type: 'image', label: 'Ảnh minh họa bước', required: true }
        }
      }
    },
    defaultData: { title: 'Quy trình làm việc', steps: [] }
  },

  // --- 6. BOOKING (Đặt lịch) ---
  // Data khớp: { title, button_text, image_url, form_schema }
  [BLOCK_TYPES.BOOKING]: {
    type: BLOCK_TYPES.BOOKING,
    name: 'Kêu gọi hành động (CTA)',
    description: 'Nút đặt lịch và ảnh minh họa',
    fields: {
      title: { type: 'text', label: 'Câu kêu gọi (Title)', required: true },
      button_text: { type: 'text', label: 'Chữ trên nút', default: 'Book now' },
      image_url: { type: 'image', label: 'Ảnh minh họa bên phải', required: true },
      form_schema: {
        type: 'array',
        label: 'Cấu hình Form',
        itemSchema: {
          field_name: { type: 'text', label: 'Tên trường (DB)', required: true },
          field_type: { 
            type: 'select', 
            label: 'Loại', 
            options: [
                {value:'text', label:'Text'}, 
                {value:'select', label:'Select'}, 
                {value:'date', label:'Date'}, 
                {value:'time', label:'Time'}
            ] 
          },
          label: { type: 'text', label: 'Label hiển thị', required: true },
          required: { type: 'select', label: 'Bắt buộc?', options: [{value:true, label:'Có'}, {value:false, label:'Không'}] },
          options: { type: 'array', label: 'Options (cho select)' } // React code phải handle array string này
        }
      }
    },
    defaultData: { title: 'Đặt lịch ngay hôm nay', button_text: 'Book now', image_url: '' }
  }
};