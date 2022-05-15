import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getArticleList} from "@/store/actions/home";
import {InfiniteScroll, PullToRefresh} from "antd-mobile";
import {useHistory} from "react-router-dom";

const ArticleList = ({channelId}) => {
    const  dispatch = useDispatch()
    const history =  useHistory()
    // 从redux里获取时间戳
    const {channelArticles} = useSelector(state => state.home)
    // console.log(channelArticles[channelId])
    // 获取到当前频道所对应的文章信息，如果初次加载，文章对象为默认值
    const currentChannelArticle = channelArticles[channelId] || {
        pre_timestamp: Date.now(),
        results: []
    }
    const {pre_timestamp, results} = currentChannelArticle
    const loadMore = async () => {
        await dispatch(getArticleList(channelId, pre_timestamp))
    }

    const hasMore = pre_timestamp !== null

    const onRefresh = async () => {
        await dispatch(getArticleList(channelId, Date.now() + '')) // 下拉刷新，获取的是最新的数据
    }

    const renderArticleList = () => {
      return results.map((item, index) => {
          const {
              title,
              pubdate,
              comm_count,
              aut_name,
              cover: {type, images},
              art_id
          } = item

          const articleDate = {
              title,
              pubdate,
              comm_count,
              aut_name,
              type,
              images
          }

          return <div onClick={() => history.push(`/article/${art_id}`)} key={index} className="article-item">
              <ArticleItem {...articleDate}/>
          </div>
      })
    }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
        <PullToRefresh onRefresh={onRefresh}>
            {/*{*/}
            {/*    results.map((item,index) => (*/}
            {/*        <div key={index} className='article-item'>*/}
            {/*            <ArticleItem type={1}/>*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
            {renderArticleList()}
            <InfiniteScroll loadMore={loadMore}  hasMore={hasMore}/>
        </PullToRefresh>

        {/*<div className="article-item">*/}
        {/*    <ArticleItem/>*/}
        {/*</div>*/}
    </div>
  )
}

export default ArticleList
