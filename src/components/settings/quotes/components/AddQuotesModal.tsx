import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addMyQuotesService,
  editFavoriteService,
  updateMyQuotesService
} from "../../../../firebase/functions/QuotesActions";
import { getMyQuotesAction } from "../../../../Redux/Actions/Quotes.actions";
import Button from "../../../common/button/button";

interface Props {
  isOpen: boolean;
  closeModal: any;
  openModal: any;
  type: string;
  id?: string;
  fav?: any;
  quote?: string;
  authorName?: string;
}

const AddQuotesModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  openModal,
  id,
  type,
  fav,
  quote,
  authorName
}) => {
  const [quotes, setQuotes] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const addQuoteHandler = async () => {
    if (type === "add") {
      addMyQuotesService(quotes, author, false);
      dispatch(getMyQuotesAction());
      closeHandler();
    }
    if (type === "edit") {
      console.log("edit", quotes);
      if (id) {
        updateMyQuotesService(id, {
          quote: quotes,
          author: author,
          favourite: fav
        });
        dispatch(getMyQuotesAction());
        editFavoriteService(id, quotes);
        closeHandler();
      }
    }
  };

  const closeHandler = () => {
    closeModal();
    setAuthor("");
    setQuotes("");
  };

  useEffect(() => {
    if (quote) setQuotes(quote);
    if (authorName) setAuthor(authorName);
  }, []);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed h-full inset-0 rounded-lg w-full z-10"
          onClose={closeHandler}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="align-middle h-screen inline-block"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="align-middle glass inline-block my-8 overflow-y-auto p-6 rounded shadow-xl text-left transform transition-all w-4/12">
                <h1 className="font-bold text-gray-900 text-lg">
                  {type === "add" ? "Add new quote" : "Edit quote"}
                </h1>
                <input
                  onChange={e => setQuotes(e.target.value)}
                  value={quotes}
                  type="text"
                  placeholder="Add quote"
                  className="bg-transparent border border-gray-900 focus:outline-none focus:ring font-bold mb-1 mt-3 outline-none p-1 placeholder-gray-900 placeholder-opacity-50 px-3 py-2 relative text-gray-900 text-lg w-full"
                />
                <input
                  onChange={e => setAuthor(e.target.value)}
                  value={author}
                  type="text"
                  placeholder="Add author"
                  className="bg-transparent border border-gray-900 focus:outline-none focus:ring font-bold mb-1 mt-3 outline-none p-1 placeholder-gray-900 placeholder-opacity-50 px-3 py-2 relative text-gray-900 text-lg w-full"
                />
                <div className="flex mt-4">
                  <Button
                    style={{ marginRight: "10px" }}
                    kind="elevated"
                    className="focus:outline-none"
                    onClick={addQuoteHandler}>
                    Add
                  </Button>
                  <Button
                    kind="elevated"
                    className="focus:outline-none"
                    onClick={closeHandler}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddQuotesModal;
