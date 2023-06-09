"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"

import useDebounce from "@/hooks/useDebounce"
import useModalSearch from "@/hooks/useModalSearch"
import * as httpRequest from "@/request/httpRequest"
import WrapperModal from "./WrapperModal"
import { MetaIProps, ProductDataIProps } from "@/types"

interface DataIProps {
  data: ProductDataIProps[]
  meta: MetaIProps
}
const initialData: DataIProps = {
  data: [],
  meta: {
    pagination: {
      page: 0,
      pageCount: 0,
      pageSize: 0,
      total: 0,
    },
  },
}
const ModalSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<DataIProps>(initialData)
  const [loading, setLoading] = useState<boolean>(false)
  const showModal = useModalSearch((state) => state.showModal)
  const setShowModal = useModalSearch((state) => state.setShowModal)
  const debounce = useDebounce({ value: searchValue, delay: 500 })

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResults(initialData)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      const { data, meta } = await httpRequest.get(`/products?populate=*&filters[name][$startsWithi]=${debounce}`)
      setLoading(false)
      setSearchResults({ data, meta })
    }

    fetchData()
  }, [debounce])

  return (
    <WrapperModal showModal={showModal} setShowModal={() => setShowModal(false)}>
      <div className="w-full md:w-[35rem] h-[60vh] overflow-hidden p-4 flex flex-col">
        <div className="flex items-center gap-3 relative">
          <BsSearch size={18} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 px-3 py-2"
          />
          {searchValue.trim().length > 0 && (
            <button className="absolute right-2 top-1/2 p-2 -translate-y-1/2" onClick={() => setSearchValue("")}>
              <IoCloseOutline size={20} />
            </button>
          )}
        </div>

        <div className="overflow-y-auto mt-4 flex-1 pb-4">
          {loading ? (
            <p className="flex items-center justify-center">Result for '{debounce}' ...</p>
          ) : searchResults?.meta?.pagination?.total > 0 ? (
            searchResults?.data?.map(({ attributes }, i) => (
              <Link
                href={`/product/${attributes?.slug}`}
                key={`search-item-${i}`}
                onClick={() => setShowModal(false)}
                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-200 "
              >
                <img
                  src={attributes?.thumbnail?.data?.attributes?.url || "/spinner.svg"}
                  alt={attributes?.name}
                  className="w-20 md:w-32"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{attributes?.name}</h3>
                  <p className="text-gray-400 font-medium">{attributes?.subtitle}</p>
                </div>
              </Link>
            ))
          ) : searchResults?.meta?.pagination?.total === 0 && searchResults?.meta?.pagination?.page === 1 ? (
            <p className="flex items-center justify-center">No result</p>
          ) : (
            <p className="flex items-center justify-center">Enter shoe name</p>
          )}
        </div>
      </div>
    </WrapperModal>
  )
}

export default ModalSearch
