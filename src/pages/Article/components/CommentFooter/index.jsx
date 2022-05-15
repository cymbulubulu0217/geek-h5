import Icon from '@/components/Icon'
import styles from './index.module.scss'


const CommentFooter = ({ type = 'normal' }) => {
  return (
    <div className={styles.root}>
      <div className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item">
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{1}</span>}
          </div>
          <div className="action-item">
            <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item">
            <Icon type={true ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item">
          <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
