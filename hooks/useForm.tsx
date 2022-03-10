import React, { ReactChild, useCallback, useState } from 'react';

export type fieldsOption<T> = {
  label: string;
  inputType: 'text' | 'password' | 'textarea';
  key: keyof T;
}

export function useForm<T>(initFormData: T, onSubmit: (formData: T) => void, fields: fieldsOption<T>[], submitButton: ReactChild) {
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const initErrors: { [key in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) { // 为了严谨
        initErrors[key] = [];
      }
    }
    return initErrors;
  });
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }, [formData]);
  const _onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  }, [onSubmit]);
  const form = (
    <form className='form' onSubmit={_onSubmit}>
      {fields.map((field) => {
        const { label, inputType, key } = field;
        return (
          <div key={key.toString()}>
            {errors[key]?.length > 0 && <div>{errors[key].join(',')}</div>}
            <div className='edit-row'>
              <label className='label'>{label}</label>
              {inputType === 'textarea'
                ? <textarea
                  className='input-control textarea'
                  value={formData[key].toString()}
                  onChange={(e) => onChange(key, e.target.value)} />
                : <input
                  className='input-control input'
                  type={inputType}
                  value={formData[key].toString()}
                  onChange={(e) => onChange(key, e.target.value)} />}
            </div>
          </div>
        )
      })}
      {submitButton}
      <style jsx>{`
        .form {
          width: 100%;
        }
        .edit-row {
          display: flex;
          width: 100%;
          margin-bottom: 10px;
        }
        .edit-row .input-control{
          flex: 1;
        }
        .input-control.textarea {
          height: 60vh;
        }
        .edit-row .label {
          margin-right: 1em;
        }
      `}</style>
    </form>
  )
  return {
    form,
    setErrors
  }
}