import React, { useState, useEffect, Fragment } from 'react';
import { Button, Container, Row, Col, Card, FormSelect, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Timeline.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const data_month = [
  { month: 'Mùa khô', year: 2014, value: 1 },
  { month: 'Mùa mưa', year: 2014, value: 2 },
  { month: 'Mùa khô', year: 2015, value: 3 },
  { month: 'Mùa mưa', year: 2015, value: 4 },
  { month: 'Mùa khô', year: 2016, value: 5 },
  { month: 'Mùa mưa', year: 2016, value: 6 },
  { month: 'Mùa khô', year: 2017, value: 7 },
  { month: 'Mùa mưa', year: 2017, value: 8 },
  { month: 'Mùa khô', year: 2018, value: 9 },
  { month: 'Mùa mưa', year: 2018, value: 10 },
  { month: 'Mùa khô', year: 2019, value: 11 },
  { month: 'Mùa mưa', year: 2019, value: 12 },
  { month: 'Mùa khô', year: 2020, value: 13 },
  { month: 'Mùa mưa', year: 2020, value: 14 },
  { month: 'Mùa khô', year: 2021, value: 15 },
  { month: 'Mùa mưa', year: 2021, value: 16 },
  { month: 'Mùa khô', year: 2022, value: 17 },
  { month: 'Mùa mưa', year: 2022, value: 18 },
  { month: 'Mùa khô', year: 2023, value: 19 },
  { month: 'Mùa mưa', year: 2023, value: 20 },
];

const Timeline = ({ onCurrentFrameChange }) => {
  const [currentFrame, setCurrentFrame] = useState(() => parseInt(localStorage.getItem('currentFrame')) || 1); // Bắt đầu từ 1, nếu không có trong Local Storage thì mặc định là 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame === data_month.length ? 1 : prevFrame + 1));
      }, 1000 / speed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  useEffect(() => {
    localStorage.setItem('currentFrame', currentFrame);
    onCurrentFrameChange(currentFrame)
  }, [currentFrame]);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleRangeChange = (e) => {
    setCurrentFrame(parseInt(e.target.value));
  };

  const handleRadioChange = (frame) => {
    setCurrentFrame(frame);
  };

  const handleSpeedChange = (newValue) => {
    setSpeed(newValue);
  };

  const handleBackward = () => {
    setCurrentFrame((prevFrame) => (prevFrame === 1 ? data_month.length : prevFrame - 1)); // Quay lại frame trước đó
  };

  const handleForward = () => {
    setCurrentFrame((prevFrame) => (prevFrame === data_month.length ? 1 : prevFrame + 1)); // Tiến tới frame kế tiếp
  };

  const maxValue = data_month.length; // Kết thúc ở data_month.length

  return (
    <Container className='align-items-center justify-content-center timeLineC m-0'>
      <Card className='timeLineC m-1'>
        <Row className="align-items-center">
          <Col className="align-items-center" xs={12} sm={2} md={1}  lg={1}>
              <Row className="align-items-center justify-content-center my-1">
                <Col className="align-items-center justify-content-center" xs={2} sm={4} md={4} lg={4}>
                  <Button onClick={handleBackward} variant="primary" className="" size='sm'>
                    <FontAwesomeIcon icon={faBackward} />
                  </Button>
                </Col>
                  
                <Col className="align-items-center justify-content-center" xs={2} sm={4} md={4} lg={4}>
                  <Button onClick={handlePlayPause} variant="primary" className="" size='sm'>
                    {isPlaying ? <FontAwesomeIcon icon={faPause} style={{ width: '12px' }} /> : <FontAwesomeIcon icon={faPlay} style={{ width: '12px' }} />}
                  </Button>
                </Col>

                <Col className="align-items-center justify-content-center" xs={2} sm={4} md={4} lg={4}>
                  <Button onClick={handleForward} variant="primary" className="" size='sm'>
                    <FontAwesomeIcon icon={faForward} />
                  </Button>
                </Col>
              </Row>
              
         
              <Row className="align-items-center justify-content-center ">
              {/* <Col className="align-items-center justify-content-center" xs={0} sm={1} md={1} lg={1}></Col> */}
                <Col className="align-items-center justify-content-center"  xs={4} sm={10} md={10} lg={12}>
                  <Form.Select
                    className="form-select"
                    value={speed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                    disabled={isPlaying}
                    aria-label="Default select example"
                    // size="sm"
                    // style={{ width: '5vw' }}
                  >
                    <option value={0.25}>Speed 0.25x</option>
                    <option value={0.5}>Speed 0.5x</option>
                    <option value={1}>Speed 1x</option>
                    <option value={1.5}>Speed 1.5x</option>
                    <option value={2}>Speed 2x</option>
                  </Form.Select>
                </Col>
                {window.innerWidth < 1000 ? (
                    <Col className="align-items-center justify-content-center"  xs={4} sm={10} md={10} lg={10}>
                    <Form.Text className="text-muted">Năm: {
                      data_month[currentFrame - 1].year
                    }</Form.Text>
                  </Col>
                ) : null}
                {/* <Col className="align-items-center justify-content-center" xs={0} sm={1} md={1} lg={1}></Col> */}
              </Row>
          </Col>
          <Col className="timeline-container align-items-center " xs={12} sm={10} md={11}  lg={11}>
            <Row>
              <div className="range">
                <input
                  type="range"
                  className="form-range"
                  min={1} // Bắt đầu từ 1
                  max={maxValue} // Kết thúc ở data_month.length
                  step={1}
                  value={currentFrame}
                  onChange={handleRangeChange}
                  disabled={isPlaying}
                />
              </div>
            </Row>
            <br />
            <Row>
              <div className="timeline">
                {data_month.map((item, index) => (
                    <Fragment key={index}>
                   <div
                    key={index}
                    className={`timeline-item ${currentFrame === index + 1 ? 'active' : ''}`} // Thay đổi từ index sang index + 1
                    onClick={() => handleRadioChange(index + 1)} // Thay đổi từ index sang index + 1
                  >
                    {window.innerWidth > 1000 ? item.year : null}
                    <p style={{ fontSize: '0.6rem' }}>
                      
                      {
                      item.month === 'Mùa khô' ? (
                        <FontAwesomeIcon icon={faSun} style={{ color: 'orange' }} />
                      ) : (
                        <FontAwesomeIcon icon={faCloudRain} style={{ color: 'blue' }} />
                      )
                    }
                    {/* {currentFrame === index + 1 && window.innerWidth <1000 ? item.year : null} */}
                    </p>
                  </div>
                    </Fragment>
                ))}
              </div>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>

  );
};

export default Timeline;
