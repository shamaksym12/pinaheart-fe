import React, { Component } from 'react'
import cn from 'classnames'

const Pagination = ({total, current, onChange, allVisible = false}) => {
    const isVisible = page => {
        if (total < 4 || allVisible) {
            return true
        }
        const isCurrent = page == current
        const isNext = page == current+1
        const isPrev = page == current-1

        const isStart = current == 1 && page == current + 2
        const isFinish = current == total && page == current - 2
        return isCurrent || isNext || isPrev || isStart || isFinish
    }
    const canPrev = () => {
        return current*1 > 1
    }
    const canNext = () => {
        return current*1 < total
    }
    const handleNext = () => {
        if (canNext()) {
            onChange((current*1)+1)
        }
    }
    const handlePrev = () => {
        if (canPrev()) {
            onChange((current*1)-1)
        }
    }
    const renderPages = (page, i) => {
        return  <div className={cn('page', {current: current == i+1})} onClick={() => onChange(i+1)}>
                    {i+1}
                    <style jsx>{`
                        .page {
                            border: 1px solid #F4EBEB;
                            padding: 5px 11px;
                            border-radius: 7px;
                            cursor: pointer;
                        }
                        .page:hover {
                            background: #FEF7F7;
                            color: #C5141B;
                        }
                        .page.current {
                            border-color: #C5141B;
                            color: #C5141B;
                        }
                    `}
                    </style>
                </div>
    }
    return  <div className="wrap-pagination">
                <div className={cn('prev', {active: canPrev()})} onClick={() => handlePrev()}>
                    <i className="fas fa-chevron-left"></i>
                    <span>Previous</span>
                </div>
                <div className="wrap-list">
                    { [...new Array(total)].map((page, i) => <div key={i} className={cn('wrap-item', {hidden: !isVisible(i+1)})}>
                        {renderPages(page, i)}</div>) }
                </div>
                <div className={cn('next', {active: canNext()})} onClick={() => handleNext()}>
                    <span>Next</span>
                    <i className="fas fa-chevron-right"></i>
                </div>

                <style jsx>{`
                    .wrap-pagination {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 5px 0px;
                    }
                    .wrap-list {
                        display: flex;
                        align-items: center;
                        margin-left: 15px;
                        margin-right: 15px;
                    }
                    .wrap-item {
                        padding: 0 5px;
                    }
                    .prev,
                    .next {
                        color: #F4EBEB;
                    }
                    .next.active,
                    .prev.active {
                        color: #848183;
                        cursor: pointer;
                    }
                    .prev i {
                        margin-right: 10px;
                    }
                    .next i {
                        margin-left: 10px;
                    }
                `}
                </style>
            </div>
}

export default Pagination