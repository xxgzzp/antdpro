import { apiMaterialMaterialList } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
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
        {/*<tr {...(props as Omit<React.HTMLProps<HTMLTableRowElement>, 'index'>)}></tr>*/}
        <tr {...props}></tr>
      </EditableContext.Provider>
    </Form>
  );
};
export const EditableCell: React.FC<EditableCellProps> = ({
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
  // 要把options map放在全局，因为初始化组件后，数据就没了
  const { setOptions, getOptions } = useModel('editableOptions');
  const { data: materialOption, run: getMaterial } = useRequest(apiMaterialMaterialList, {
    manual: true,
    debounceWait: 500, // 防抖500ms
  });
  const { data: materialSelectOption, run: getMaterialSelectOption } = useRequest(
    apiMaterialMaterialList,
    {
      manual: true,
    },
  );
  useEffect(() => {
    const materialNameOptions = materialOption?.results
      .map((r) => ({
        value: r.name,
        label: r.name,
      }))
      .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index);
    const materialSkuOptions = materialOption?.results
      .map((r) => ({
        value: r.sku,
        label: r.sku,
      }))
      .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index);
    const materialUnitOptions = materialOption?.results
      .map((r) => ({
        value: r.unit,
        label: r.unit,
      }))
      .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index);
    if (materialNameOptions) {
      setOptions('material_name', materialNameOptions);
    }
    if (materialSkuOptions) {
      setOptions('material_sku', materialSkuOptions);
    }
    if (materialUnitOptions) {
      setOptions('material_unit', materialUnitOptions);
    }
  }, [materialOption]);

  useEffect(() => {
    // 当选择了material_name时，会重置sku unit 等的 options
    const materialSkuOptions = materialSelectOption?.results
      .map((r) => ({
        value: r.sku,
        label: r.sku,
      }))
      .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index);
    const materialUnitOptions = materialSelectOption?.results
      .map((r) => ({
        value: r.unit,
        label: r.unit,
      }))
      .filter((item, index, arr) => arr.findIndex((t) => t.label === item.label) === index);
    if (materialSkuOptions) {
      setOptions('material_sku', materialSkuOptions);
    }
    if (materialUnitOptions) {
      setOptions('material_unit', materialUnitOptions);
    }
  }, [materialSelectOption]);

  const handleSearch = (dataIndex: string, text: string) => {
    // 后续改进 改用不同的搜索算法 和 通信协议
    if (dataIndex === 'material_name') {
      getMaterial({ search: text });
    }
    if (dataIndex === 'material_sku') {
      getMaterial({ search: text });
    }
    if (dataIndex === 'material_unit') {
      getMaterial({ search: text });
    }
  };

  const handleSelect = (dataIndex: string, text: string) => {
    // 当选择了material_name，就重置sku和unit的options
    if (dataIndex === 'material_name') {
      getMaterialSelectOption({ name: text });
    }
  };
  // 以下是官网的示例代码
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
  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <AutoComplete
          options={getOptions(dataIndex) || []}
          onSearch={(text) => handleSearch(dataIndex, text)}
          onSelect={(text) => handleSelect(dataIndex, text)}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </AutoComplete>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  // @ts-ignore
  return <td {...restProps}>{childNode}</td>;
};
