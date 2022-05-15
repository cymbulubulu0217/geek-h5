import {Input, NavBar, TextArea} from 'antd-mobile'

import styles from './index.module.scss'
import {useState} from "react";
import {popMap} from "@/pages/Profile/Edit";

const EditInput = ({hiddenEditInput, inputPop, updateName}) => {
    const [value, setValue] = useState(inputPop.value)

    const  onSave = () => {
        updateName({
            [inputPop.type]: value
        })
    }

    const label = popMap[inputPop.type]?.label
    const isName = popMap.type === popMap.name.type
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={hiddenEditInput}
        right={<span className="commit-btn" onClick={onSave}>提交</span>}
      >
        编辑{label}
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
            {
                isName ?
                    <Input value={value} onChange={setValue} placeholder="请输入"/> :
                    (<TextArea value={value} onChange={setValue} className={'textarea'} showCount placeholder="请输入简介" maxLength={100} rows={4}/>)
            }
        </div>
      </div>
    </div>
  )
}

export default EditInput
