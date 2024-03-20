import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { PDFService } from '../services/PDFService';
import { UserContext } from '../context/UserContext';
import { getDocumentById } from '../services/DocumentService';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BookReaderPdf = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const [isMouseOutside, setIsMouseOutside] = useState(false);
  const { user } = useContext(UserContext);
  const [activationCode, setActivationCode] = useState('');
  const [showActivationCodeModal, setShowActivationCodeModal] = useState(false);
  const [isDrmProtected, setIsDrmProtected] = useState(false);
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const document = await getDocumentById(id);
        console.log('Document:', document);
        setIsDrmProtected(document.drmEnabled);

        if (user.role === 'ROLE_ADMIN' || !document.drmEnabled) {
          const pdfBlob = await PDFService.fetchPdf(id);
          console.log('PDF Blob:', pdfBlob);
          setFile(new Blob([pdfBlob], { type: 'application/pdf' }));
        } else {
          setShowActivationCodeModal(true);
        }
      } catch (error) {
        console.error('Failed to fetch document:', error);
        toast.error('Đã xảy ra lỗi khi tải tài liệu. Vui lòng thử lại sau.');
      }
    };

    if (user.auth) {
      fetchDocument();
    } else {
      toast.error('Bạn cần đăng nhập để đọc tài liệu.');
    }
  }, [id, user.auth, user.role]);

  const handleActivationCodeSubmit = async () => {
    if (activationCode.trim() === '') {
      toast.warning('Vui lòng nhập mã kích hoạt.');
      return;
    }

    try {
      const pdfBlob = await PDFService.fetchPdf(id, activationCode);
      setFile(new Blob([pdfBlob], { type: 'application/pdf' }));
      setShowActivationCodeModal(false);
      toast.success('Mã kích hoạt hợp lệ. Đang tải tài liệu...');
    } catch (error) {
      console.error('Failed to fetch PDF with activation code:', error);
      if (error.response && error.response.status === 403) {
        toast.error('Mã kích hoạt không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.');
      } else {
        toast.error('Đã xảy ra lỗi khi tải tài liệu. Vui lòng thử lại sau.');
      }
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageInput = (e) => {
    setPageInput(e.target.value);
  };

  const goToPage = () => {
    const newPageNumber = Number(pageInput);
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  useEffect(() => {
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

    document.onmouseleave = function() {
      setIsMouseOutside(true);
    };
  }, []);

  const handleDialogClick = () => {
    setIsMouseOutside(false);
  };

  useEffect(() => {
    if (isDrmProtected && user.role !== 'ROLE_ADMIN') {
      setShowActivationCodeModal(true);
    }
  }, [isDrmProtected, user.role]);

  if (!user.auth) {
    return <div>Bạn cần đăng nhập để đọc tài liệu.</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      {/* Modal nhập mã kích hoạt */}
      <Modal
        show={showActivationCodeModal}
        onHide={() => setShowActivationCodeModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã kích hoạt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="activationCode">
            <Form.Label>Mã kích hoạt:</Form.Label>
            <Form.Control
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActivationCodeModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleActivationCodeSubmit}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {file && (
        <>
          {isMouseOutside && (
            <div
              onClick={handleDialogClick}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
              }}
            >
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', fontSize: '20px', color: 'red' }}>
                Vui lòng click chuột vào trang web để tiếp tục
              </div>
            </div>
          )}
          <div style={{ width: '700px', border: '3px solid gray' }}>
            <div>
              <p>Page {pageNumber} of {numPages}</p>
              <button onClick={() => setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1))}>Previous</button>
              <button onClick={() => setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages))}>Next</button>
              <input type="number" value={pageInput} onChange={handlePageInput} />
              <button onClick={goToPage}>Go to page</button>
            </div>
            <div style={{ height: '700px', overflow: 'auto' }}>
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookReaderPdf;