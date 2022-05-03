## 02-vue3-B站移动端

- vue3比较好的一个项目
  
### Mock数据的使用
- 建立mock文件夹，并创建index.ts文件来导入不同的数据文件
```javascript
import Mock from 'mockjs'  // 需要先引入 mockjs 组件
import commentsList from './data/commentsList'
import videoDetailList from './data/videoDetailList'

// mock的配置
Mock.setup({
  // 随机延时50-1000毫秒
  timeout: '50-1000'
})
Mock.mock(/\/commentsList/, 'get', () => {
  return {
    code: 0,
    result: {
      count: 454,
      items: commentsList
    }
  }
})
interface IMockConfig {
  body: string | null;
  type: string
  url: string
}
Mock.mock(/\/videoDetail/, 'get', ({ url }: IMockConfig) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(item => item.id === id)
    }
  })
})
```
- data目录下存放各个不同功能的数据文件，内容如下
```javascript
export default [
  {
    id: '0',
    link: '',
    imgSrc: 'https://i0.hdslb.com/bfs/archive/0563c3df12637178e8b08858e5fd11e4a6906acc.jpg@320w_200h.webp',
    desc: '世界上广告最多的网站判定！真的有10000条广告！【暗物质#2】',
    playCount: '24.9万',
    commentCount: '1345',
    videoSrc: 'http://files.ak48.xyz/2018120195458.mp4'
  },
  {
    id: '1',
    link: '',
    imgSrc: 'https://i0.hdslb.com/bfs/archive/b08463bc1257b6294bad1e1646a3203f9f3a0c60.jpg@320w_200h.webp',
    desc: '【圣地亚哥金曲】藏，超好听的中国风电音鬼畜！',
    playCount: '63.8万',
    commentCount: '7825',
    videoSrc: 'http://files.ak48.xyz/20181219211856.mp4'
  },
  {
    id: '2',
    link: '',
    imgSrc: 'https://i0.hdslb.com/bfs/archive/02cf0e3a1fd52f80763fd51ee7fae69e51cf173c.jpg@320w_200h.webp',
    desc: '迈克尔杰克逊封神的12秒，无人能做到',
    playCount: '63.8万',
    commentCount: '7825',
    videoSrc: 'http://files.ak48.xyz/20181219211920.mp4'
  },
  {
    id: '3',
    link: '',
    imgSrc: 'https://i0.hdslb.com/bfs/archive/dc7147ffa4e11a2fffa84b295b2f2bdbbfe3e6d7.jpg@320w_200h.webp',
    desc: '【2018】年度影视混剪 Ready Story 2018【混剪】',
    playCount: '40.0万',
    commentCount: '1066',
    videoSrc: 'http://files.ak48.xyz/20181219211910.mp4'
  }
]
```
### 防盗链使用
- 因为B站开启了防盗链，利用的是HTTP的Referer属性做判断。如果Referer是他白名单之外的网站，就会返回403
- 通过在head标签中设置如上标志，那么全站资源引用都不会携带referrer
- 在 public/index.html 中添加如下代码，解决B站图片的防盗链问题
    - TODO:了解相关知识
    - `<meta name="referrer" content="no-referrer">`
