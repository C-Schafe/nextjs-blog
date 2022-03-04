import Link from "next/link";
import _ from 'lodash';

type pagerOption = {
  allCount: number;
  currentPage: number;
  totalPage: number;
}

export function usePager(option:pagerOption) {
  const { allCount, currentPage, totalPage } = option;
  const pageNumArray = [];
  if(totalPage >= 1) {
    pageNumArray.push(1)
  }
  for(let i = currentPage - 3; i <= currentPage + 3; i++ ) {
    pageNumArray.push(i)
  }
  pageNumArray.push(totalPage);
  const filteredArray = _.uniq(pageNumArray).filter((value) => value >= 1 && value <= totalPage);
  const targetedPageNum = filteredArray.reduce((result, value) => {
    if(value - (result[result.length - 1] || 0) === 1) {
      return result.concat(value);
    } else {
      return result.concat(-1, value);
    }
  }, []);
  const pager = (
    <div>
      {currentPage > 1 &&  <Link href={`/posts?page=${currentPage - 1}`}><a>上一页</a></Link>}
      {targetedPageNum.map((pageNum) => {
        if(pageNum === -1) {
          return '...';
        } else {
          return pageNum === currentPage ? `[${pageNum}] ` : `${pageNum} `;
        }
      })}
      [{currentPage}/{totalPage}]
      {currentPage < totalPage && <Link href={`/posts?page=${currentPage + 1}`}><a>下一页</a></Link>}
    </div>
  )
  return {
    pager
  };
}