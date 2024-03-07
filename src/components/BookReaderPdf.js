import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { PDFService } from '../services/PDFService';

const BookReaderPdf = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [pageInput, setPageInput] = useState(''); 
  const [isMouseOutside, setIsMouseOutside] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  useEffect(() => {
    const fetchPDF = async () => {
      const pdfBlob = await PDFService.fetchPdf(id);
      setFile(URL.createObjectURL(pdfBlob));
    };

    fetchPDF().catch(console.error);
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Thêm hàm xử lý cho việc nhập số trang
  const handlePageInput = (e) => {
    setPageInput(e.target.value);
  };

  // Thêm hàm xử lý cho việc di chuyển đến trang
  const goToPage = () => {
    const newPageNumber = Number(pageInput);
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  useEffect(() => {
    // Vô hiệu hóa nút F12 và chuột phải
    document.onkeydown = function (e) {
      if (e.keyCode === 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false;
      }
    };
    document.oncontextmenu = function (e) {
      e.preventDefault();
    };

    // Vô hiệu hóa nút Ctrl+P, PrtSc, và Windows+R
    window.onkeydown = function(e) {
      if (e.ctrlKey && e.keyCode === 80) {
        return false;
      }
      if (e.keyCode === 44) {
        return false;
      }
      if (e.metaKey && e.keyCode === 82) {
        return false;
      }
    };

    // Hiện thông báo khi người dùng không để chuột ở trang web
    document.onmouseleave = function() {
      setIsMouseOutside(true);
    };
  }, []);

  const handleDialogClick = () => {
    setIsMouseOutside(false);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
    {isMouseOutside && (
      <div onClick={handleDialogClick} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', fontSize: '20px', color: 'red' }}>
          Vui lòng click chuột vào trang web để tiếp tục
        </div>
      </div>
    )}
      <div style={{ width: '700px', border: '3px solid gray' }}>
        <div>
          <p>Page {pageNumber} of {numPages}</p>
          <button onClick={() => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1))}>Previous</button>
          <button onClick={() => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages))}>Next</button>
          <input type="number" value={pageInput} onChange={handlePageInput} />
          <button onClick={goToPage}>Go to page</button>
        </div>
        <div style={{ height: '700px', overflow: 'auto' }}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default BookReaderPdf;