import React, { useEffect, useRef } from 'react';

const MapComponent = ({ locations }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null); // map instance를 저장하기 위한 ref

  useEffect(() => {
    const { kakao } = window;

    if (!mapInstance.current) {
      // 지도 초기화
      const mapOptions = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울)
        level: 3, // 확대 레벨
      };
      mapInstance.current = new kakao.maps.Map(mapContainer.current, mapOptions);
    }

    // 마커 초기화 및 추가
    locations.forEach(location => {
      const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(mapInstance.current);

      // infowindow 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${location.name}</div>`, // 표시될 내용
      });

      // 마커에 마우스 오버 이벤트 추가
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(mapInstance.current, marker);
      });

      // 마커에 마우스 아웃 이벤트 추가
      kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });
    });

    // 마커들의 중앙 좌표로 지도 이동
    if (locations.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend(new kakao.maps.LatLng(location.latitude, location.longitude));
      });
      mapInstance.current.setBounds(bounds);
    }

  }, [locations]); // locations 배열이 변경될 때마다 마커를 업데이트

  return <div ref={mapContainer} style={{ width: '100%', height: '600px' }}></div>;
};

export default MapComponent;
