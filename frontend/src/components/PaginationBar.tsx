import { Fragment } from "react";
import { Pagination } from "react-bootstrap";

interface PaginationBarProps {
    pageCount: number;
    currentPage: number;
    onPageItemClick: (page: number) => void;
    className?: string;

}

export default function PaginationBar({pageCount, currentPage, onPageItemClick, className}: PaginationBarProps) {
   const PaginationMaxPage = Math.min(pageCount, Math.max(currentPage +4, 10));
    const PaginationMinPage = Math.max(1, Math.min(currentPage - 5, pageCount - 9));
    const numberedPageItems: JSX.Element[] = [];
   
    for (let i = PaginationMinPage; i <= PaginationMaxPage; i++){
        let pageItem: JSX.Element;
       if(i === currentPage){
        const currentPageItemSizeMdOnly = <Pagination.Item active className= "d-none d-md-block">{i}</Pagination.Item>
        const currentPageItemSizeSmOnly = <Pagination.Item active className= "d-sm-block d-md-none">Page: {i}</Pagination.Item>
        pageItem =
        <Fragment key={i}>
            {currentPageItemSizeMdOnly}
            {currentPageItemSizeSmOnly}
        </Fragment>
       }else{
        pageItem = <Pagination.Item 
        key={i} 
        className="d-none d-md-block"
        onClick={() => onPageItemClick(i)}>
            {i}
            </Pagination.Item>
       }
       numberedPageItems.push(pageItem);

    }

      
    

       
    
    return(
        <Pagination className={className}>
            {currentPage > 1 && 
            <>
            <Pagination.First onClick={()=> onPageItemClick(1)} />
            <Pagination.Prev   onClick={()=> onPageItemClick(currentPage -1)} />
            
            </>
           }
            {numberedPageItems}

            {currentPage < pageCount && 
            <>
            <Pagination.Next  onClick={()=> onPageItemClick(currentPage +1)} />
            <Pagination.Last onClick={()=> onPageItemClick(pageCount)} />
            </>
            }
            
                
        </Pagination>
    );
}