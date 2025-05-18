import React, { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
    const {searchQuery, selectedCategory , minPrice, maxPrice, keyword} = useFilter();

    const [products, setProducts] = useState<any[]>([])
    const [filter, setFilter] =useState('all')
    const [currentPage, setCurrentPage] =useState(1)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const itemsPerPage:number = 12; 


    useEffect(()=>{
        let url:string= `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage-1)*itemsPerPage}`

        if(keyword) {
            url= `https://dummyjson.com/products/search?q=${keyword}`
        }

        axios.get(url).then(Response=>{
            setProducts(Response.data.products)
            console.log(Response.data.products)
        }).catch(error=>{
            console.error('Error fetching the data', error)
        })
    },[ currentPage, keyword ])

    const getFilterdProducts = () => {
        let filterdProducts = products

        if(selectedCategory){
            filterdProducts = filterdProducts.filter(product=>product.category===selectedCategory);
        }


        if(minPrice!==undefined){
            filterdProducts = filterdProducts.filter(product=>product.price >= minPrice);
        }
        if(maxPrice!==undefined){
            filterdProducts = filterdProducts.filter(product=>product.price <= maxPrice);
        }
        if(searchQuery){
            filterdProducts = filterdProducts.filter(product=>product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        switch(filter) {
            case "expensive":
                return filterdProducts.sort((a,b)=>b.price-a.price)
            case "cheep":
                return filterdProducts.sort((a,b)=>a.price-b.price)
            case "popular":
                return filterdProducts.sort((a,b)=>b.rating-a.rating)
            default:
                return filterdProducts    
        }
    }

    const filterdProducts = getFilterdProducts()

    const totalProducts:number=100;
    const totalPages:number = Math.ceil(totalProducts/itemsPerPage);
    
    const handlePageChange = (page:number) => {
        if( page > 0 && page <=totalPages ) {
            setCurrentPage(page)
        }
    }

    const getPaginationButtons = () =>{
        const buttons:number[]=[];
        let startPage = Math.max(1,currentPage-2)
        let endPage = Math.min(totalPages,currentPage+2)

        if(currentPage-2<1){
            endPage = Math.min(totalPages,endPage+(2-currentPage-1));
        }
        
        if(currentPage+2>totalPages){
            startPage = Math.min(1, startPage- (2 -totalPages-currentPage));
        }

        for( let page =startPage ; page<= endPage; page++ ) {
            buttons.push(page);
        }
        return buttons;
    }
    
  return (
    <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
        <div className="mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="relative mb-5 mt-5">
                    <button 
                        className='border px-4 py-2 rounded-full flex items-center '
                        onClick={()=>setDropdownOpen(!dropdownOpen)}
                    >
                        <Tally3 className='mr-2'/>

                        {filter==='all'?"filter":filter.charAt(0).toLocaleLowerCase()+filter.slice(1)}
                    </button>

                    {
                        dropdownOpen&&(
                            <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                                <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={()=>setFilter('cheep')}>
                                    Cheep
                                </button>
                                <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={()=>setFilter('expensive')}>
                                    Expensive
                                </button>
                                <button className="block px-4 py-2 w-full text-left hover:bg-gray-200" onClick={()=>setFilter('popular')}>
                                    Popular
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>


            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {
                    filterdProducts.map(product => (
                        <BookCard 
                            key={product.id} 
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail}
                            price={product.price}    
                        />
                    ))
                }
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                <button 
                    className='border px-4 py-2 mx-2 rounded-full'
                    onClick={()=>handlePageChange(currentPage-1)}
                    disabled={currentPage===1}
                >
                    Previous
                </button>

                <div className="flex flex-wrap justify-center">
                    {getPaginationButtons().map(page=>(
                        <button key={page} onClick={()=>handlePageChange(page)} className={`border px-4 py-2 mx- rounded-full ${page===currentPage? 'bg-black text-white': ""}`}>
                            {page}
                        </button>
                    ))}
                </div>

                <button 
                    className='border px-4 py-2 mx-2 rounded-full'
                    onClick={()=>handlePageChange(currentPage+1)}
                    disabled={currentPage===totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    </section>
  )
}

export default MainContent