        select表                    檢舉事由,      檢舉類別,    文章標題,   檢舉者,  檢舉時間

        1.article_report =>         report_reason,          ,  article_no, mem_no,  report_date (join mem/article)
        2.article_comment_report => report_reason,          ,  comment_no, mem_no,  report_date (join mem/article_comment)
        3.goods_comment_report   => report_reason,          ,  comment_no, mem_no,  report_date (join mem/goods_comment)
      