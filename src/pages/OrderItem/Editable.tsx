import { apiMaterialMaterialList } from '@/services/ant-design-pro/api';
import type { InputRef } from 'antd';
import { AutoComplete, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../OrderItem/OrderItemList.less';
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...(props as Omit<React.HTMLProps<HTMLTableRowElement>, 'index'>)}></tr>
        {/*<tr {...props}></tr>*/}
      </EditableContext.Provider>
    </Form>
  );
};
export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const [materialOptions, setMaterialOptions] = useState();

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  const handleSearch = (dataIndex: string, text: string) => {
    apiMaterialMaterialList({ search: text }).then((r) => {
      if (dataIndex === 'material_name') {
        const res = r.results
          .map((r) => ({
            value: r.name,
            label: r.name,
          }))
          .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index); // 去重;;
        setMaterialOptions(res);
      }
      if (dataIndex === 'material_sku') {
        const res = r.results
          .map((r) => ({
            value: r.sku,
            label: r.sku,
          }))
          .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index); // 去重;;
        setMaterialOptions(res);
      }
      if (dataIndex === 'used_site') {
        const res = r.results
          .map((r) => ({
            value: r.sku,
            label: r.sku,
          }))
          .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index); // 去重;;
        setMaterialOptions(res);
      }
      //
    });
  };
  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <AutoComplete options={materialOptions} onSearch={(text) => handleSearch(dataIndex, text)}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </AutoComplete>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
