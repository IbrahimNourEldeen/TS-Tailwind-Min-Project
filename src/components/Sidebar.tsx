import React, { useEffect, useState } from "react"
import { useFilter } from "./FilterContext";
interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[]
}
const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products")
                const data: FetchResponse = await response.json()
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)));
                setCategories(uniqueCategories)
                // console.log()
            } catch (error) {
                console.error("error fetching ", error)
            }
        };
        fetchCategories()
    }, [])

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleRadioCategory = (category: string) => {
        setSelectedCategory(category);
    };

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword)
    }
    const handleReset = () => {
        setSearchQuery("")
        setSelectedCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword("")
    }
    return (
        <div className="w-64  h-screen p-5">
            <h1 className="text-2xl font-bold mb-4 mb-10">React Store</h1>

            <section className="">

                <input
                    type="text"
                    className="py-2 border-2 w-full rounded px-2 sm:mb-0"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div className="flex justify-center items-center mt-2">
                    <input
                        type="text"
                        className="py-2 mr-2 border-2 rounded px-2 sm:mb-0 w-full"
                        placeholder="Min"
                        value={minPrice ?? ''}
                        onChange={handleMinPriceChange}
                    />
                    <input
                        type="text"
                        className="py-2 border-2 rounded px-2 sm:mb-0 w-full"
                        placeholder="Max"
                        value={maxPrice ?? ''}
                        onChange={handleMaxPriceChange}
                    />
                </div>

                {/* categories */}
                <section>
                    <div className="md-5">
                        <h2 className="font-semibold text-xl mb-3">Categories</h2>
                    </div>
                    {
                        categories.map((category, index) => (
                            <label key={index} className="block mb-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    className="mr-2 w-[16px] h-[16px] translate-y-1"
                                    onChange={() => handleRadioCategory(category)}
                                    checked={selectedCategory === category}
                                />
                                {category.toUpperCase()}
                            </label>
                        ))
                    }
                </section>

                {/* keywords */}
                <div className="md-5 mt-4">
                    <h2 className="font-semibold text-xl mb-3">Keywords</h2>

                    <div className="">
                        {
                            keywords.map((keyword, index) => (
                                <button
                                    key={index}
                                    className="block mb-2 px-4 py-2 w-full text-left border rounded hover:cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleKeywordClick(keyword)}
                                >
                                    {keyword.toUpperCase()}
                                </button>
                            ))
                        }
                    </div>
                </div>


                <button
                    className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
                    onClick={handleReset}
                >
                    Reset Filters
                </button>
            </section>
        </div>
    )
}

export default Sidebar