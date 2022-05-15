import classNames from 'classnames'
const Icon = ({type,onClick=null,className}) => {
    return (
        <svg onClick={onClick} className={classNames('icon',className)} aria-hidden="true">
            {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
            <use xlinkHref={`#${type}`}/>
        </svg>
    )
}

export default Icon
