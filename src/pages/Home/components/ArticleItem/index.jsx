import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import dayjs from 'dayjs';
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化 - 中文
import 'dayjs/locale/zh-cn';
// 启用相对时间
dayjs.extend(relativeTime);
// 启用中文
dayjs.locale('zh-cn');

const ArticleItem = ({ title, pubdate, comm_count, aut_name, type = 0, images }) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
                {
                    images.map((item, index) => (
                        <div key={index} className="article-img-wrapper">
                        <img
                            src={item}
                            alt=""
                        />
                        </div>
                    ))
                }

          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs().from(pubdate)} 天前</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
