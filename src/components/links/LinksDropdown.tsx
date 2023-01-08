import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import SvgButton from "../common/button/SvgButton";
import InputComponent from "../common/InputComponent";
import Loader from "../common/Loader";
import Modal from "../common/Modal";
import AddNewLinkDialog from "./AddNewLinkDialog";
import LinkComponent from "./LinkComponent";

const LinksDropdown: React.FC<any> = ({ openDialog, setOpenDialog }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const LinksDataRedux: any = useSelector(
    (state: RootStore) => state.userLinkData
  );

  const inputRef: any = useRef();

  const linksLocalStorageData: any = localStorage.getItem("links");
  const linksLocalStorage: any = JSON.parse(linksLocalStorageData);

  const LINKS = linksLocalStorage || LinksDataRedux;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (inputRef && openDialog) {
      setTimeout(() => {
        console.log("focus");
        inputRef?.focus();
      }, 500);
    }
  }, []);

  return (
    // add "dropdown" to the first div if want to enable hover to show dialog
    <div className="inline-block mb-4 relative">
      <div
        // onKeyPress={e => e.key === "p" && setOpenDialog(!openDialog)}pp
        onClick={() => setOpenDialog(!openDialog)}>
        <SvgButton type="link" position="top-0 left-0" />
      </div>
      {openDialog && (
        <div className="dropdown-menu duration-200 ease-out ml-4 mt-12 pt-4 text-white transition-all">
          <ul className="glass rounded-t-lg">
            <div className="align-center flex justify-center">
              <div className="px-3   w-full">
                <InputComponent
                  ref={inputRef}
                  onChange={(e: any) => setSearchValue(e.target.value)}
                  value={searchValue}
                  style={{
                    minWidth: "92%"
                  }}
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
            <div
              style={{
                minWidth: "24rem",
                minHeight: "10rem",
                maxHeight: "65vh",
                overflowY: "auto",
                overflowX: "hidden"
              }}
              className="no-scrollbar w-full">
              {LINKS.data ? (
                LINKS.data
                  .filter((value: any) => {
                    if (searchValue === "") {
                      return value;
                    } else if (
                      value.data.linkTitle
                        .toLocaleLowerCase()
                        .includes(searchValue.toLocaleLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .sort(function (a: any, b: any) {
                    let textA = a?.data?.linkTitle?.toUpperCase();
                    let textB = b?.data?.linkTitle?.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                  })
                  .map((link: any) => {
                    return (
                      <li key={link.id}>
                        <LinkComponent
                          id={link.id}
                          url={link.data.links}
                          title={link.data.linkTitle}
                          type={link.data.type}
                        />
                      </li>
                    );
                  })
              ) : (
                <div className="mt-5">
                  <Loader />
                </div>
              )}

              {LINKS.loading === false && LINKS.data.length === 0 && (
                <div className="div flex h-full items-center justify-center">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1 className="font-2x font-bold my-auto text-gray-900">
                    No links found. Add new link...
                  </h1>
                </div>
              )}
            </div>
          </ul>
          <div
            style={{
              width: "96%",
              borderRadius: "0 0 10px 10px"
            }}
            onClick={() => openModal()}
            className="absolute cursor-pointer flex glass p-2 rounded-b-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 mx-3 my-auto text-white w-5 text-white hover:text-purple"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="font-bold p-1 text-white hover:text-purple">
              {" "}
              Add a new link or folder
            </h1>
          </div>
        </div>
      )}
      {/* dialog box for adding new link */}
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        Children={
          <AddNewLinkDialog
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        }
      />{" "}
    </div>
  );
};

export default LinksDropdown;
