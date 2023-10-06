import { Select } from 'antd'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../redux/Store'
import '../../styles/AntdStyles/searchbar.css'
import { getOptionsValue } from './searchbar.utils'

const SearchBar = ({ setOpenSearchBar }: any) => {
  const inputRef: any = useRef()

  const LinksDataRedux: any = useSelector(
    (state: RootStore) => state.userLinkData
  )

  const linksLocalStorageData: any = localStorage.getItem('links')
  const linksLocalStorage: any = JSON.parse(linksLocalStorageData)

  const LINKS = linksLocalStorage || LinksDataRedux

  const options = getOptionsValue(LINKS?.data)

  const selectOption = (e: any, select: boolean) => {
    const value = select ? e : e.target.value
    console.log({ value, select })
    if ((e.keyCode === 13 || select) && value.length > 0) {
      const selectedOption: any = options.find((data: any) =>
        data.value.toLowerCase().includes(value.toLowerCase())
      )
      if (!selectedOption) return
      clickHandler(selectedOption.link)
      setOpenSearchBar(false)
    }
  }

  const clickHandler = ({ type, links }: any) => {
    if (type === 'link') window.open(`https://${links[0].link}`, '_blank')
    else
      for (let i = 0; i < links.length; i++) {
        window.open(`https://${links[i].link}`, '_blank')
      }
  }

  useEffect(() => {
    setTimeout(() => {
      if (inputRef?.current?.focus) inputRef.current.focus()
    }, 100)
  }, [])

  return (
    <Select
      showSearch
      style={{
        position: 'absolute',
        top: '10%',
        left: '30%',
        width: '40%',
        boxShadow: '0 0 0 1600px rgba(0,0,0,0.65)',
        borderRadius: '14px'
      }}
      onChange={(e: any) => e.stopPropagation()}
      defaultOpen={true}
      placeholder="Search link here.."
      optionFilterProp="children"
      ref={inputRef}
      filterOption={(input: any, option: any) =>
        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.value ?? '')
          .toLowerCase()
          .localeCompare((optionB?.value ?? '').toLowerCase())
      }
      onInputKeyDown={(e: any) => selectOption(e, false)}
      options={options}
      onSelect={(option: any) => selectOption(option, true)}
    />
  )
}

export default SearchBar
