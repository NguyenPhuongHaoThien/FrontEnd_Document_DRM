import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { PDFService } from '../services/PDFService';

const BookReaderPdf = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '700px', border: '3px solid gray' }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default BookReaderPdf;