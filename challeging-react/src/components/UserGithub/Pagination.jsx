import { act, useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({ perPage, clickSearchButton}) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    const [activePage, setActivePage] = useState(null);

    const [minNumber, setMinNumber] = useState(1);

    const [maxNumber, setMaxNumber] = useState(10);


    const clickPage = async (number) => {
        setActivePage(number);

        await clickSearchButton(number);
    }

    useEffect(() => {
        const ul = document.getElementById('ul');
        ul.querySelectorAll('li').forEach(li => {
            if(li.textContent == activePage) {
                li.classList.add('page-item-click');
            }else {
                li.classList.remove('page-item-click');
            }
        });

    }, [activePage]);

    useEffect(() => {
        const newArray = [];
        if(perPage != 0){
            for(let i=1; i<= 10; i++){
                if(i <=10){
                    newArray.push(i);
                }
            }
        }

        setPageNumbers(newArray);
    }, [perPage]);

    const clickNextPage = () => {
        if(perPage <= 100){
            if(perPage !=0){
                if(1000/perPage > activePage && maxNumber < (1000/perPage)){
                    const newArray = [];
                    for(let i= minNumber +1; i<= maxNumber +1; i++){
                        if(newArray.length <10){
                            newArray.push(i);
                        }
                    }
                    setPageNumbers(newArray); 
                    clickSearchButton(activePage +1 );
                    setActivePage(prevActivePage => prevActivePage + 1);
                    setMinNumber(preMinNumber => preMinNumber +1);
                    setMaxNumber(preMax => preMax +1);
                }else {
                    alert('page max');
                }
            }
        }
    }

    const clickPreviousPage = () => {
        if(minNumber >1){
            if(perPage !=0){
                if(1000/perPage > activePage && minNumber >1){
                    const newArray = [];
                    for(let i= minNumber -1; i<= maxNumber -1; i++){
                        if(newArray.length <10){
                            newArray.push(i);
                        }
                    }
                    setPageNumbers(newArray); 
                    clickSearchButton(activePage -1 );
                    setActivePage(prevActivePage => prevActivePage -1 );
                    setMinNumber(preMinNumber => preMinNumber -1);
                    setMaxNumber(preMax => preMax -1);
                }
            }
        }else {
            alert('page min');
        }
    }

    return ( 
        <nav>
            <ul id="ul">
                <a onClick={clickPreviousPage} >
                    Previous
                </a>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => clickPage(number)} >
                       {number}
                    </li>
                ))}
                <a  onClick={clickNextPage} >
                    Next
                </a>
            </ul>
        </nav>    
    );
}
 
export default Pagination;