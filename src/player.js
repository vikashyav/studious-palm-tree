import React, { useState } from 'react';
// import { useSearchParams } from "react-router-dom";



// const files = ["Akull - Laal Chunariya (Official Video) _ Chetna Pande _ Mellow D_ Dhruv Yogi _ VYRL Originals(1080P_HD).mp4", "Atif Aslam_ Pehli Dafa Song (Video) _ Ileana D_Cruz _ Latest Hindi Song 2017 _ T-Series(1080P_HD).mp4", "Barbaadiyan (Full Video)_ Shiddat _Sunny K_Radhika M _Sachet T_Nikhita G_ Madhubanti B_Sachin -Jigar(480P).mp4", "Bhool Bhulaiyaa 2 (Title Track) Kartik A_ Kiara A_ Tabu _Pritam_ Tanishk_ Neeraj_ Anees B_ Bhushan K(1080P_HD).mp4", "Blue Eyes Full Video Song Yo Yo Honey Singh _ Blockbuster Song Of 2013(1080P_HD).mp4", "Coke Studio _ Season 14 _ Pasoori _ Ali Sethi x Shae Gill(1080P_HD).mp4", "Excuses (Official Video) _ AP Dhillon _ Gurinder Gill _ Intense(1080P_HD).mp4", "Garry Sandhu _ Like U (TERE JAISI)_ Manpreet Toor(2K_HD).webm", "Kehndi Haan Kehndi Naa - Sukriti _ Prakriti Kakar _ Arjun B _ Siddhant K _ Rishabh K _ VYRLOriginals(1080P_HD).mp4", "KHAAB __ AKHIL __ PARMISH VERMA __ NEW PUNJABI SONG 2018 __ CROWN RECORDS __(720P_HD).mp4", "Khairiyat Video _ Chhichhore _ Nitesh Tiwari _ Arijit Singh _ Sushant_ Shraddha _ Pritam _ Amitabh B(720P_HD).mp4", "Koi Vi Nahi (Full Video) _ Shirley Setia _ Gurnazar _ Rajat Nagpal Latest Songs 2018 _ Speed Records(480P).mp4", "Mafiyaan - Sukriti _ Prakriti Kakar ft. MellowD _ MJ5 _ Official Music Video _ VYRL Originals(720P_HD).mp4", "Maiyya Mainu - Jersey _ Shahid Kapoor_ Mrunal T_ Sachet-Parampara_Shellee_ Gowtam T_ 22nd April 2022(720P_HD).mp4", "Nai Jaana Video _ Tulsi Kumar_ Sachet Tandon_ Tanishk Bagchi _ Nirmaan  _ Awez D_Musskan S_Anmol(720P_HD).mp4", "Rahat Fateh Ali Khan - Zaroori Tha(1080P_HD).mp4", "Sooryavanshi_ Mere Yaaraa Song _ Akshay Kumar_ Katrina Kaif_ Rohit Shetty_ Arijit S Neeti _ JAM8 KAG(1080P_HD).mp4", "Tera Hone Laga Hoon Lyrical - Ajab Prem Ki Ghazab Kahani _ Atif Aslam _ Ranbir_ Katrina K _ Pritam(1080P_HD).mp4", "TERI MERI LADAYI (Full Song) Maninder Buttar feat. Tania _ Akasa _ Arvindr Khaira _ MixSingh _Jugni(240P).mp4", "Tujh Mein Rab Dikhta Hai Song _ Rab Ne Bana Di Jodi _ Shah Rukh Khan_ Anushka Sharma _ Roop Kumar(1080P_HD).mp4", "_Kabira Full Song_ Yeh Jawaani Hai Deewani _ Pritam _ Ranbir Kapoor_ Deepika Padukone(1080P_HD).mp4"];
// window._query_ = {"filename":"Excuses (Official Video) _ AP Dhillon _ Gurinder Gill _ Intense(1080P_HD).mp4"};

// window._query_ = ${JSON.stringify(Object.fromEntries(currentParams.entries()))};

const VideoPlayer = ({ files, queryParams }) => {
  const baseUrl = `/stream`;
  const [videoUrl, setVideoUrl] = useState(`/stream?filename=${queryParams?.filename || files?.[0]}`);
  const [currentTime, setCurrentTime] = useState(0);
  //   let [searchParams, setSearchParams] = useSearchParams()
  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
    setVideoUrl(`${baseUrl}?t=${event.target.currentTime}`)
  };

  console.log(videoUrl, "ffff...");

  return (
    <>
      <div
        className='bg-slate-600 w-auto max-h-[450px]'
      >
        <video
        className='w-full max-h-[450px]' 
          controls
          // onTimeUpdate={handleTimeUpdate}
          src={`${videoUrl}`}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-4">
        {(files || [])?.map((file, index) => (
          <div key={index} onClick={() => {
            // setSearchParams({filename: file})
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("filename", file);
            window.history.pushState({}, '', newUrl.toString());
            setVideoUrl(`${baseUrl}?filename=${file}`)
          }}
            style={{ cursor: "pointer" }}
            // className='text-red-400'
            className="cursor-pointer border rounded shadow hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex items-center justify-center h-32 bg-gray-200">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-32 object-cover"
              />
              <p className="text-sm text-gray-600">{file}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoPlayer;
