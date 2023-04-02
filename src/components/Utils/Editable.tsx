import { apiMaterialMaterialList } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import type { InputRef } from 'antd';
import { AutoComplete, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../Utils/Editable.less';
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
  const { setOptions, getOptions, handleSearch, readyState, connect } = useModel('editableOptions');

  // TODO:用户选择material_name后，自动回填sku和unit的options
  const { data: materialSelectOption, run: getMaterialSelectOption } = useRequest(
    apiMaterialMaterialList,
    {
      manual: true,
    },
  );

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

  const handleSelect = (dataIndex: string, text: string) => {
    // 当选择了material_name，就重置sku和unit的options
    if (dataIndex === 'material_name') {
      getMaterialSelectOption({ name: text });
    }
  };

  // getOptions方法中添加高亮匹配部分的逻辑
  const getOptionsHighLight = (dataIndex: string, searchValue: string | undefined) => {
    const options = getOptions(dataIndex);
    if (options && searchValue) {
      const filteredOptions = options.map((opt) => {
        const labelMatchIndex = opt?.label?.toLowerCase().indexOf(searchValue.toLowerCase());
        if (labelMatchIndex && labelMatchIndex >= 0) {
          const beforeStr = opt?.label?.slice(0, labelMatchIndex);
          const matchStr = opt?.label?.slice(labelMatchIndex, labelMatchIndex + searchValue.length);
          const afterStr = opt?.label?.slice(labelMatchIndex + searchValue.length);
          return {
            ...opt,
            label: (
              <span>
                {beforeStr}
                <span style={{ color: 'red' }}>{matchStr}</span>
                {afterStr}
              </span>
            ),
          };
        }
        return opt;
      });
      return filteredOptions;
    }
    return options;
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
          options={getOptionsHighLight(dataIndex, inputRef.current?.input?.value)}
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
