import { motion } from 'framer-motion'
import React from 'react'
import BookmarkIcons from '../common/BookmarkIcons'
import EditDeleteLink from './EditDeleteLink'
import { LinkClickHandler } from './utils'

interface Props {
  id: string
  title: string
  url: any
  type: string
}

const LinkComponent: React.FC<Props> = ({ id, title, url, type }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="mx-3">
        <div className="cursor-pointer flex glasslink p-2 w-full rounded-[8px]">
          <div
            onClick={() => LinkClickHandler(type, url)}
            className="flex w-full mx-1"
          >
            <BookmarkIcons url={url} type={type} />
            <a className="block font-bold my-auto px-4 py-auto text-white text-l w-full whitespace-no-wrap hover:text-purple">
              {title.length > 30 ? title.substring(0, 30) + '...' : title}
            </a>
          </div>

          <div className="editlink hidden">
            <EditDeleteLink link={{ id, title, url, type }} />
          </div>
        </div>
        <div className="ml-14">{/* edit modal */}</div>
      </div>
    </motion.div>
  )
}

export default LinkComponent
