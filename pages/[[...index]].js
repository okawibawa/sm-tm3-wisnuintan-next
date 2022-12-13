import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import ModalImage from "react-modal-image";
import sal from "sal.js";
import Router, { useRouter } from "next/router";
import "../node_modules/sal.js/dist/sal.css";
import { supabase } from "../utils/supabaseClient";
import Swal from "sweetalert2";

// 1 2 3 4 7 10 11 12 13 14 16 18
import imgOne from "../public/1.jpg";
import imgTwo from "../public/2.jpg";
import imgThree from "../public/3.jpg";
import imgFour from "../public/4.jpg";
import imgFive from "/public/5.jpg";
import imgSix from "/public/6.jpg";
import imgSeven from "/public/7.jpg";
import imgEight from "/public/8.jpg";
import imgNine from "/public/9.jpg";
import imgTen from "/public/10.jpg";

const IMAGES = [null];

// components
import Layout from "../components/Layout";

const IndexPage = ({ context }) => {
  const router = useRouter();
  const [isShow, setIsShow] = React.useState(true);
  const [modalWish, setModalWish] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const [name, setName] = React.useState("");
  const [hour, setHour] = React.useState("11");
  const [minutes, setMinutes] = React.useState("00");
  const [hourEnd, setHourEnd] = React.useState("");
  const [minutesEnd, setMinutesEnd] = React.useState("");

  const [secondOne, setSecondOne] = React.useState(0);
  const [minuteOne, setMinuteOne] = React.useState(0);
  const [hourOne, setHourOne] = React.useState(0);
  const [dayOne, setDayOne] = React.useState(0);

  const [secondTwo, setSecondTwo] = React.useState(0);
  const [minuteTwo, setMinuteTwo] = React.useState(0);
  const [hourTwo, setHourTwo] = React.useState(0);
  const [dayTwo, setDayTwo] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const [newComment, setNewComment] = React.useState([]);
  const [from, setFrom] = React.useState("");
  const [text, setText] = React.useState("");
  const [bool1, setBool1] = React.useState(false);
  const [bool2, setBool2] = React.useState(false);

  sal();

  useEffect(() => {
    const path = router.asPath.split("/");

    if (path.length > 0) {
      if (path[1] == "[...index]") {
        setName("");
      } else {
        const name = path[1].replace(/-/g, " ");

        setName(name);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchMessages = async () => {
      const { data, error, status } = await supabase
        .from("messages")
        .select("*")
        .order("id", { ascending: false });

      const subscribe = await supabase
        .from("messages")
        .on("*", (payload) => {
          setNewComment(payload.new);
        })
        .subscribe();

      setData(data);
      setIsLoading(false);
    };

    fetchMessages();
  }, [newComment]);

  // Count time 2
  let countDownDate2 = new Date(
    `December 21, 2022 ${hour}:${minutes}:00`
  ).getTime();

  const updateCountDownDate2 = setInterval(function () {
    let newDate2 = new Date().getTime();

    let distance2 = countDownDate2 - newDate2;

    var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor(
      (distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);

    if (distance2 < 0) {
      return;
    } else {
      setDayTwo(days2);
      setHourTwo(hours2);
      setMinuteTwo(minutes2);
      setSecondTwo(seconds2);
    }
  }, 1000);

  const handleCloseModal = () => {
    setIsShow(false);
    setIsPlaying(true);
    // sound.play()
    // setIsPlaying(true)
  };

  const playAudio = () => {
    setIsPlaying(!isPlaying);
    setIsVideoPlaying(false);
  };

  // const handlePlayVideo = () => {
  //   if (isPlaying) {
  //     setIsPlaying(false);
  //     setIsVideoPlaying(true);
  //   }
  // };

  const shoDisplay = isShow ? 0 : 1;

  const modals = async () => {
    if (!from || !text) {
      Swal.fire(
        "Perhatian!",
        "Tolong isi nama dan ucapan dengan lengkap!",
        "warning"
      );
    } else {
      Swal.fire({
        title: "Perhatian!",
        text: "Anda yakin ingin mengirim ucapan ini? Ucapan tidak akan bisa dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, kirim!",
        cancelButtonText: "Tidak!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const { data, error } = await supabase.from("messages").insert([
            {
              slug: "wisnu-intan-22",
              from: from,
              text: text,
              attend_1: bool1,
              attend_2: bool2,
            },
          ]);

          setFrom("");
          setText("");
          setBool1(false);
          setBool2(false);

          return data;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Sukses!", "Ucapan telah dikirim!", "success");
        }
      });
    }
  };

  const QRMOdal = (src) => {
    Swal.fire({
      text: "Halo, terima kasih ya 💞",
      imageUrl: src,
      imageWidth: 160,
    });
  };

  const copyText = () => navigator.clipboard.writeText("081382819007");

  return (
    <Layout>
      <Head>
        <title>Pawiwahan Surya & Dytha | Segera Menikah</title>
        <meta name="title" content="Pawiwahan Surya & Dytha | Segera Menikah" />
        <meta
          name="description"
          content="Pawiwahan Surya & Dytha, 21 Desember 2022."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://wisnu.intan.segeramenikah.com"
        />
        <meta
          property="og:title"
          content="Pawiwahan Surya & Dytha | Segera Menikah"
        />
        <meta
          property="og:description"
          content="Pawiwahan Surya & Dytha, 21 Desember 2022."
        />
        <meta property="og:image" content="/5.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://wisnu.intan.segeramenikah.com"
        />
        <meta
          property="twitter:title"
          content="Pawiwahan Surya & Dytha | Segera Menikah"
        />
        <meta
          property="twitter:description"
          content="Pawiwahan Surya & Dytha, 21 Desember 2022."
        />
        <meta property="twitter:image" content="/5.jpg" />
      </Head>

      <Modal
        isOpen={isShow}
        contentLabel="Minimal Modal Example"
        htmlOpenClassName="modal-open"
        className="modal"
        overlayClassName="modal-overlay open close"
        closeTimeoutMS={1000}
      >
        <div className="main">
          <div className="modal-container gradient">
            <div className="modal-titles">
              <h1 className="modal-title shadow">Pawiwahan</h1>
              <h2 className="modal-names shadow">Surya & Dytha</h2>
            </div>

            <div className="modal-details">
              <div className="modal-card date">
                <div className="modal-icon">
                  <Image
                    priority
                    width={24}
                    height={24}
                    src="/calendar.svg"
                    alt="Calendar"
                  />
                </div>
                <div className="modal-info">
                  <p>Rabu,</p>
                  <b>21/12/2022</b>
                </div>
              </div>

              {name && (
                <div className="modal-card person">
                  <div className="modal-icon">
                    <Image
                      priority
                      width={24}
                      height={24}
                      src="/person.svg"
                      alt="Person"
                    />
                  </div>
                  <div className="modal-info">
                    <p>Kepada Yth.</p>
                    <b>{name}</b>
                  </div>
                </div>
              )}

              <div className="modal-cta-container">
                <button
                  id="btnCta"
                  className="modal-btn-invite"
                  onClick={() => handleCloseModal()}
                >
                  Open Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <main style={{ opacity: shoDisplay }}>
        <ReactPlayer
          style={{ display: "none" }}
          playing={isPlaying}
          loop={true}
          // url="https://soundcloud.com/carlomedinaii/angels-brought-me-here"
          url="/soundtrack.mp3"
        />

        <div
          onClick={playAudio}
          className="volume-ic-container"
          id="audio-container"
        >
          <Image
            priority
            width={28}
            height={28}
            src={isPlaying ? "/volume.svg" : "/muted.svg"}
            alt="Volume"
          />
        </div>

        {/* First Section */}
        <section id="main-section">
          <div className="main-gradient">
            <div className="titles">
              <h1
                className="main-title shadow"
                data-sal="slide-up"
                data-sal-duration="1250"
                data-sal-easing="ease"
              >
                Pawiwahan
              </h1>
              <h2
                className="names shadow"
                data-sal="slide-up"
                data-sal-duration="1250"
                data-sal-easing="ease"
              >
                Surya & Dytha
              </h2>
            </div>
          </div>
        </section>

        {/* Veda */}
        <div className="sm-card veda">
          <p
            data-sal="slide-up"
            data-sal-duration="1250"
            data-sal-easing="ease"
          >
            Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan ini
            senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak pernah
            terpisahkan, panjang umur dan tinggal di rumah yang penuh
            kegembiraan bersama seluruh keturunannya.
          </p>

          <div className="arts">
            <h6
              data-sal="slide-up"
              data-sal-duration="1250"
              data-sal-easing="ease"
            >
              Rg. Veda X.85.42.
            </h6>
          </div>
        </div>

        {/* Second Section */}
        <section id="second-section">
          <div
            className="second-container"
            data-sal="slide-up"
            data-sal-duration="1250"
            data-sal-easing="ease"
          >
            <h1 className="ss-main-title" style={{ color: "transparent" }}>
              Sang Mempelai Pria
            </h1>

            <div className="cards-container">
              <div
                className="card"
                data-sal="slide-up"
                data-sal-duration="1250"
                data-sal-easing="ease"
              >
                <h1>Bripda Gusti Putu Surya Saputra</h1>
                <p>
                  Putra pertama dari pasangan<br></br> AKP I Gusti Putu Suarka &
                  Sayu Ketut Suryatini
                </p>
                <p style={{ fontSize: "10px" }}>
                  Br. Pasar, Desa Yehembang, Mendoyo, Jembrana
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section id="second-section-second">
          <div
            className="second-container"
            data-sal="slide-up"
            data-sal-duration="1250"
            data-sal-easing="ease"
          >
            <h1 className="ss-main-title" style={{ color: "transparent" }}>
              Sang Mempelai Wanita
            </h1>

            <div className="cards-container">
              <div
                className="card"
                data-sal="slide-up"
                data-sal-duration="1250"
                data-sal-easing="ease"
              >
                <h1>Bripda Desak Ayu Dytha Damayanthi</h1>
                <p>
                  Putri pertama dari pasangan<br></br> Iptu I Dewa Made Arnawa,
                  S.H. & Ipda Ni Luh Gede Rastini, S.H.
                </p>
                <p style={{ fontSize: "10px" }}>
                  Jln. Sekar Sari Gang 1 No.12A Denpasar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fourth Section */}
        <section id="fourth-section">
          {/* <div className="title-gradient"></div> */}
          <div className="fourth-container">
            <div
              className="th-title"
              data-sal="slide-up"
              data-sal-duration="1250"
              data-sal-easing="ease"
            >
              {/* <h1 style={{ zIndex: 9999 }}>Resepsi</h1> */}
              <Image
                priority
                width={64}
                height={64}
                src="/gate.svg"
                alt="Wedding Gate"
                style={{ zIndex: 99999999 }}
              />
            </div>

            <div
              className="details"
              data-sal="slide-up"
              data-sal-duration="1250"
              data-sal-easing="ease"
            >
              <div className="card-container">
                <div className="card-ts date">
                  <div className="icon">
                    <Image
                      priority
                      width={20}
                      height={20}
                      src="/calendar.svg"
                      alt="Calendar"
                    />
                  </div>
                  <div className="info">
                    <p>Rabu,</p>
                    <b className="info-date">21/12/2022</b>
                  </div>
                </div>
              </div>

              <div className="card-container">
                <div className="card-ts time">
                  <div className="icon">
                    <Image
                      priority
                      width={28}
                      height={28}
                      src="/person.svg"
                      alt="Person"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="info">
                      <p>11.00 WITA</p>
                      <p>s/d selesai</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-container">
                <a
                  href="https://maps.app.goo.gl/h1bEHmZ8cEuJkrFb6?g_st=iw"
                  className="wrapper"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="card-ts location">
                    <div className="icon">
                      <Image
                        priority
                        width={20}
                        height={20}
                        src="/calendar.svg"
                        alt="Calendar"
                      />
                    </div>
                    <div className="info">
                      <b style={{ marginBottom: "6px" }}>Alamat Acara</b>
                      <p>UD RAMA DIGITAL Toko Alat Tulis dan Percetakan</p>
                    </div>
                  </div>
                  <p className="view-location">VIEW LOCATION</p>
                </a>
              </div>

              <div className="card-container">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  className="wrapper"
                >
                  <div className="card-ts save-date">
                    <div className="info">
                      <b style={{ marginBottom: "6px" }}>Disimpan ya!</b>
                      <p className="infoSmDesc">Klik untuk menyimpan acara</p>
                    </div>

                    <div className="detail-times">
                      <div>
                        <p id="days2">{dayTwo}</p>
                        <p>Hari</p>
                      </div>

                      <div>
                        <p id="hours2">{hourTwo}</p>
                        <p>Jam</p>
                      </div>

                      <div>
                        <p id="minutes2">{minuteTwo}</p>
                        <p>Menit</p>
                      </div>

                      <div>
                        <p id="seconds2">{secondTwo}</p>
                        <p>Detik</p>
                      </div>
                    </div>
                  </div>
                  <p className="save-the-date">SAVE THE DATE</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Santhi */}
        <div className="sm-card closing">
          <div className="arts-container">
            <p
              data-sal="slide-up"
              data-sal-duration="1250"
              data-sal-easing="ease"
            >
              Suatu kebahagian bagi kami apabila Bapak/ Ibu/Saudara/i berkenan
              memberikan doa restu untuk kami.
              <br />
              <br />
              Atas doa restunya, kami ucapkan terimakasih.
            </p>

            <div
              className="title"
              data-sal="slide-up"
              data-sal-duration="1250"
              data-sal-easing="ease"
            >
              <h6>Om Shanti Shanti Shanti Om</h6>
              <br />
            </div>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="gallery-container">
          {new Array(11).fill(null).map((img, index) => (
            <div
              key={index}
              data-sal="slide-up"
              data-sal-duration="900"
              className="img-container"
            >
              <ModalImage
                small={`/${index + 1}.jpg`}
                large={`/${index + 1}.jpg`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Video */}
        {/* <div id="video-container" className="video-wrapper">
            <ReactPlayer
              playing={isVideoPlaying}
              onPlay={() => handlePlayVideo()}
              url="https://www.youtube.com/embed/RuBs1fyj4wo"
            />
          </div> */}

        {/* Wishes */}
        {/* <div className="sm-card">
          <h6 className="wishes__title">Doa & Ucapan</h6>

          <p
            style={{
              textAlign: 'left',
              marginBottom: '1rem',
              borderBottom: '1px solid white',
              paddingBottom: '.5rem',
            }}
          >
            {data.length} doa & ucapan
          </p>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {isLoading ? (
              <div>
                <h6>Mohon tunggu...</h6>
              </div>
            ) : data.length > 0 ? (
              data.map((wish) => (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <div className="wishes__sender">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className="wishes__name">{wish.from}</p>
                        <p className="wishes__attend">
                          {wish.attend_1 === true && wish.attend_2 === true
                            ? 'Hadir di sesi 1 & 2'
                            : wish.attend_1 === true
                            ? 'Hadir di sesi 1'
                            : wish.attend_2 === true
                            ? 'Hadir di sesi 2'
                            : 'Tidak hadir'}
                        </p>
                      </div>
                      <p className="wishes__date">
                        {new Date(wish.created_at).toLocaleString('default', { dateStyle: 'long' })}{' '}
                        {new Date(wish.created_at).toLocaleString('default', { timeStyle: 'medium' })}
                      </p>
                    </div>

                    <p style={{ textAlign: 'left', marginTop: '.825rem' }}>{wish.text}</p>
                  </div>
                </>
              ))
            ) : (
              <div>
                <h4>Tidak terdapat doa & ucapan</h4>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <p style={{ textAlign: 'left', fontSize: '1rem' }}>Katakan sesuatu</p>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  style={{ fontFamily: 'Raleway' }}
                  className="wishes_input"
                  type="text"
                  placeholder="e.g. Aditya"
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                />
              </div>

              <div style={{ margin: '1rem 0' }}>
                <textarea
                  style={{ fontFamily: 'Raleway' }}
                  rows="4"
                  className="wishes_input"
                  type="text"
                  placeholder="e.g. Selamat berbahagia!"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
              </div>

              <div style={{ marginBottom: '1rem', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <input
                  onChange={(e) => setBool1(e.target.checked)}
                  id="attendance1"
                  style={{ width: '24px' }}
                  type="checkbox"
                  checked={bool1}
                />
                <label htmlFor="attendance1" style={{ marginLeft: '.225rem', fontSize: '1rem' }}>
                  Akan hadir di sesi 1
                </label>
              </div>

              <div style={{ marginBottom: '1rem', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <input
                  onChange={(e) => setBool2(e.target.checked)}
                  id="attendance2"
                  style={{ width: '24px' }}
                  type="checkbox"
                  checked={bool2}
                />
                <label htmlFor="attendance2" style={{ marginLeft: '.225rem', fontSize: '1rem' }}>
                  Akan hadir di sesi 2
                </label>
              </div>

              <button className="wishes__btn" onClick={modals}>
                Send it!
              </button>
            </div>
          </div>
        </div> */}
        {/* Wishes End */}

        {/* Gift */}
        {/* <div className="sm-card">
          <h6 className="wishes__title">Hadiah</h6>

          <p>
            Tanpa mengurangi rasa hormat, untuk melengkapi kebahagiaan
            pengantin, Anda dapat memberikan tanda kasih dengan transfer ke
            rekening ke alamat berikut:
          </p>

          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: ".625rem .825rem",
                borderRadius: "1rem",
                color: "black",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  style={{ width: "50%", maxWidth: "120px" }}
                  src="/bca-logo.png"
                  alt="bca"
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ color: "black" }}>6785013909</p> {"-"}
                  <p
                    onClick={() => navigator.clipboard.writeText("6785013909")}
                    style={{ color: "purple" }}
                  >
                    Copy
                  </p>
                </div>
                <p style={{ margin: ".525rem 0" }}>Kadek Wisnu Bhuana</p>
                <button
                  style={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "white",
                    width: "100%",
                    padding: ".825rem 0",
                    borderRadius: "1.25rem",
                  }}
                  onClick={() => QRMOdal("/bca.jpeg")}
                >
                  Buka QR Code
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: ".625rem .825rem",
                borderRadius: "1rem",
                color: "black",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  style={{ width: "50%", maxWidth: "120px" }}
                  src="/gopay-logo.png"
                  alt="gopay"
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ color: "black" }}>+6281382819007</p> {"-"}
                  <p onClick={copyText} style={{ color: "purple" }}>
                    Copy
                  </p>
                </div>
                <p style={{ margin: ".525rem 0" }}>Kadek Wisnu Bhuana</p>
                <button
                  style={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "white",
                    width: "100%",
                    padding: ".825rem 0",
                    borderRadius: "1.25rem",
                  }}
                  onClick={() => QRMOdal("/gopay.jpeg")}
                >
                  Buka QR Code
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: ".625rem .825rem",
                borderRadius: "1rem",
                color: "black",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  style={{ width: "50%", maxWidth: "120px" }}
                  src="/ovo-logo.png"
                  alt="ovo"
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ color: "black" }}>+6281382819007</p> {"-"}
                  <p onClick={copyText} style={{ color: "purple" }}>
                    Copy
                  </p>
                </div>
                <p style={{ margin: ".525rem 0" }}>Kadek Wisnu Bhuana</p>
                <button
                  style={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "white",
                    width: "100%",
                    padding: ".825rem 0",
                    borderRadius: "1.25rem",
                  }}
                  onClick={() => QRMOdal("/ovo.jpeg")}
                >
                  Buka QR Code
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: ".625rem .825rem",
                borderRadius: "1rem",
                color: "black",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  style={{ width: "50%", maxWidth: "120px" }}
                  src="/dana-logo.png"
                  alt="dana"
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ color: "black" }}>+6281382819007</p> {"-"}
                  <p onClick={copyText} style={{ color: "purple" }}>
                    Copy
                  </p>
                </div>
                <p style={{ margin: ".525rem 0" }}>Kadek Wisnu Bhuana</p>
                <button
                  style={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "white",
                    width: "100%",
                    padding: ".825rem 0",
                    borderRadius: "1.25rem",
                    marginBottom: ".425rem",
                  }}
                  onClick={() => QRMOdal("/dana.jpeg")}
                >
                  Buka QR Code
                </button>
                <button
                  style={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "white",
                    width: "100%",
                    padding: ".825rem 0",
                    borderRadius: "1.25rem",
                  }}
                  onClick={() =>
                    router.replace("https://link.dana.id/qr/6na67h7")
                  }
                >
                  Buka Link Dana
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/* Gift Ends */}

        {/* Footer */}
        <div className="sm-card footer">
          <div className="footer-text">
            <p>Terima Kasih</p>
            <h6>Surya & Dytha</h6>
          </div>

          <div className="credits">
            <div className="cr-text">
              <a
                href="https://segeramenikah.com/"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                &#9400; Copyright | Segera Menikah
              </a>
            </div>

            <div className="contacts">
              <a href="https://wa.me/626285157722353?text=Halo%20Segera%20Menikah.">
                <Image
                  priority
                  width={64}
                  height={64}
                  src="/whatsapp.svg"
                  alt="Whatsapp"
                />
              </a>

              <a href="https://www.instagram.com/segera_menikah/">
                <Image
                  priority
                  width={64}
                  height={64}
                  src="/instagram.svg"
                  alt="Instagram"
                />
              </a>

              <a className="ic-last" href="#">
                <Image
                  priority
                  width={64}
                  height={64}
                  src="/instagram.svg"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps = async (context) => {
  return {
    props: {
      context: context.query,
    },
  };
};
