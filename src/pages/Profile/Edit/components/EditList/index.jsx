import styles from './index.module.scss'
// import {Input} from "antd-mobile";
import { useRef} from "react";

const genderList = [
    { text: '男', value: '0' },
    { text: '女', value: '1' },
];


const photoList = [
    { text: '拍照', value: '' },
    { text: '本地选择', value: '' },
];


const EditList = ({onClose, updateName, type, changePhoto}) =>  {
    const fileRef = useRef(null)

    const currentList = type === 'gender' ? genderList : photoList;
    const onItemClick = (gender) => () => {
        if(!type) return
        if(type === 'photo') {
            fileRef.current?.click()
        } else {
            updateName({
                [type]: gender
            })
        }

    }

    const handleChangePhoto = (e) => {
        // console.log(e)
        const file = e.target.files[0]
        // console.log(file)
        if(!file) return
        const fd = new FormData()
        fd.append('photo', file)
        changePhoto(fd)
    }
  return (
    <div className={styles.root}>
      {/*<div className="list-item" onClick={onItemClick('0')}>男</div>*/}
      {/*<div className="list-item" onClick={onItemClick('1')}>女</div>*/}
        {
            currentList.map((item, index) => (
                <div key={index} className="list-item" onClick={onItemClick(item.value)}>{item.text}</div>
            ))
        }
        <div onClick={onClose} className="list-item">取消</div>
        <input onChange={handleChangePhoto} type="file" hidden ref={fileRef}/>
    </div>
  )
}

export default EditList
