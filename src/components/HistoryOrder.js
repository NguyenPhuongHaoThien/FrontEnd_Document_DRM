import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchHistoryOrders } from '../services/UserService';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaClipboardCheck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import CopyToClipboard from 'react-copy-to-clipboard';

const HistoryOrder = () => {
  const { user } = useContext(UserContext);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchHistoryOrders();
        setHistoryOrders(data);
      } catch (error) {
        console.error('Failed to fetch history orders:', error);
      }
    };

    if (user.auth) {
      fetchHistory();
    }
  }, [user]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (dateString) {
      return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } else {
      return 'N/A';
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Lịch Sử Xin Quyền Truy Vấn Tài Liệu</h2>
      {historyOrders.map((historyOrder) => (
        <Card key={historyOrder.order.id} className="mb-4 shadow-sm">
          <Card.Body>
            <Row>
              <Col md={8}>
                <h4>Mã Danh Sách Tài Liệu: {historyOrder.order.id}</h4>
                <p>
                  <FaCalendarAlt className="mr-2" />
                  Ngày Xin: {formatDate(historyOrder.activationCode?.startDate)}
                </p>
                <p>
                  <FaCalendarAlt className="mr-2" />
                  Ngày Hết Hạn: {formatDate(historyOrder.activationCode?.endDate)}
                </p>
                <p>
                  <FaClipboardCheck className="mr-2" />
                  Status: <Badge variant={historyOrder.order.orderStatus === 'APPROVED' ? 'success' : 'danger'}>{historyOrder.order.orderStatus}</Badge>
                </p>
                <h5>Tài Liệu Trong Danh Sách:</h5>
                <ul>
                  {historyOrder.documents.map((document) => (
                    <li key={document.id}>{document.name}</li>
                  ))}
                </ul>
              </Col>
              <Col md={4}>
                {historyOrder.activationCode && (
                  <>
                    <h5>Mã Code:</h5>
                    <p>
                      <FaCheckCircle className={`mr-2 ${historyOrder.activationCode.status === 'ACTIVE' ? 'text-success' : 'text-danger'}`} />
                      Code: {historyOrder.activationCode.code}
                      <CopyToClipboard text={historyOrder.activationCode.code} onCopy={handleCopy}>
                        <Button variant={copied ? 'success' : 'primary'} size="sm" className="ml-2">
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                      </CopyToClipboard>
                    </p>
                    <p>
                      <FaTimesCircle className={`mr-2 ${historyOrder.activationCode.status === 'ACTIVE' ? 'text-success' : 'text-danger'}`} />
                      Trạng Thái: {historyOrder.activationCode.status}
                    </p>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default HistoryOrder;