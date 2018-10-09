# 维基搜索

## v0.1说明

### API的使用

使用：[API根文档](https://zh.wikipedia.org/w/api.php)

搜索内容API[https://zh.wikipedia.org/w/api.php?action=help&modules=query](https://zh.wikipedia.org/w/api.php?action=help&modules=query)



提取文章内容

- 标题
- 摘要

提取图片

- 缩略图

文章链接





接入点：

中文：[https://zh.wikipedia.org/w/api.php](https://zh.wikipedia.org/w/api.php)

英文：[https://en.wikipedia.org/w/api.php](https://en.wikipedia.org/w/api.php)

# `origin`

当通过跨域名AJAX请求（CORS）访问API时，设置此作为起始域名。这必须包括在任何pre-flight请求中，并因此必须是请求的URI的一部分（而不是POST正文）。对于已验证的请求，这必须正确匹配`Origin`标头中的原点之一，因此它已经设置为像[https://en.wikipedia.org](https://en.wikipedia.org/)或[https://meta.wikimedia.org](https://meta.wikimedia.org/)的东西。如果此参数不匹配`Origin`页顶，就返回403错误响应。如果此参数匹配`Origin`页顶并且起点被白名单，将设置`Access-Control-Allow-Origin`和`Access-Control-Allow-Credentials`开头。对于未验证的请求，会指定值*。这将导致`Access-Control-Allow-Origin`标头被设置，但`Access-Control-Allow-Credentials`将为`false`，且所有用户特定数据将受限制。

# `format`

输出的格式。

- [json](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/json)

  输出数据为JSON格式。

- [jsonfm](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/jsonfm)

  输出数据为JSON格式（HTML优质打印效果）。

- [none](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/none)

  不输出任何东西。

- [php](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/php)

  输出数据为序列化PHP格式。

- [phpfm](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/phpfm)

  输出数据为序列化PHP格式（HTML优质打印效果）。

- [rawfm](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/rawfm)

  输出数据为JSON格式，包含调试元素（HTML优质打印效果）。

- [xml](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/xml)

  输出数据为XML格式。

- [xmlfm](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/xmlfm)

  输出数据为XML格式（HTML优质打印效果）。

- # `action`：要执行的操作

  - ## `query`：取得来自并有关MediaWiki的数据

    - ### `generator`通过执行指定查询模块获得页面列表以工作。

      - **[`search`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Bsearch)执行一次全文本搜索。**
        - `srsearch`搜索所有匹配此值的页面标题或内容。这个参数是必须的。
        - `srlimit`返回的总计页面数。不允许超过500个。
        - `srwhat`要执行的搜索类型。以下值中的一个：title|text|nearmatch
        - `srenablerewrites`启用内部查询重写。一些搜索后端可以重写查询到另一个被认为能提供更好结果的位置，例如纠正拼写错误。
      - **[`mostviewed`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Bmostviewed)列举最多访问页面（基于最近一天的页面浏览计数）。**
        - `pvimlimit`要返回的页面数量。不允许超过500个。默认：10
      - **[`random`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Brandom)获取随机页面集。**
        - `rnlimit`限制返回多少随机页面。不允许超过500个。默认1个

    - ### `prop`：获取已查询页面的属性

      - **[`description`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Bdescription)获取一段简短描述（或称子标题）解释目标页面有关什么话题。**
      - **[`extracts`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Bextracts)返回指定页面的纯文本或有限的HTML页面内容提取物。**
        - `exchars` 返回多少个字符。值必须介于1和1,200之间。
        - `exsentences` 返回的句子数量。值必须介于1和10之间。
        - `exlimit`要返回多少提取物。多个提取物只能在exintro设置为真时返回。默认：20.不允许超过20个。
        - `exintro`只返回在首个章节前的内容。类型：布尔值。
        - `explaintext`返回提取物为纯文本而非HTML。类型：布尔值。
        - `exsectionformat`纯文本模式下如何格式化章节。默认：wiki。|plain：无格式|raw。
        - `excontinue`当更多结果可用时，使用这个继续。
      - **[`pageimages`](https://zh.wikipedia.org/wiki/Special:Api%E5%B8%AE%E5%8A%A9/query%2Bpageimages)返回页面上的图像的相关信息，例如缩略图和照片呈现信息**
        - `piprop`返回哪些信息
          - `thumbnail`与页面相关联的缩略图图像URL及其尺寸，如有。
          - `original`与页面相关联的图像URL及其原始尺寸，如有。
          - `name`图像标题
        - `pithumbsize`缩略图的最大宽度（像素）。类型：整数。默认：50

  - ## `opensearch`：搜索字符串。也就是用户的搜索关键字

    - `limit`：要返回的结果最大数。不允许超过500个（对于机器人则是5,000个）。
    - `format`：输出格式。以下值中的一个：json、jsonfm、xml、xmlfm默认：json