import { apiMaterialMaterialRead } from '@/services/ant-design-pro/api';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

function MaterialDetailsModal({ materialId, visible, onClose }) {
  const [material, setMaterial] = useState<>(null);
  useEffect(() => {
    async function fetchMaterial() {
      const material = await apiMaterialMaterialRead({ id: materialId });
      setMaterial(material);
    }
    fetchMaterial();
  }, [materialId]);
  return (
    <Modal open={visible} onCancel={onClose} onOk={onClose} title="Material Details">
      {material && (
        <div>
          <p>Material ID: {material.id}</p>
          <p>Material Name: {material.name}</p>
          <p>Material Description: {material.description}</p>
          {/* Add other fields as needed */}
        </div>
      )}
    </Modal>
  );
}
export default MaterialDetailsModal;
