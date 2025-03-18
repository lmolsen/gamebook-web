import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate, frame } from 'motion';
import './Cube.scss'; 
import S from '../../assets/images/S.png';
import Y from '../../assets/images/Y.png';
import N from '../../assets/images/N.png';
import T from '../../assets/images/T.png';
import A from '../../assets/images/A.png';
import X from '../../assets/images/X.png';


export default function Cube (){
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null; 

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(
      25,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();


    const textureLoader = new THREE.TextureLoader();
    const textures = [
      textureLoader.load(S),
      textureLoader.load(Y),
      textureLoader.load(N),
      textureLoader.load(T),
      textureLoader.load(A),
      textureLoader.load(X),
    ];


    const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

    const cube = new THREE.Mesh(geometry, materials);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 2);
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    scene.add(directionalLight);
    scene.add(cube);

    camera.position.z = 5;

    function rad(degrees) {
        return degrees * (Math.PI / 180);
      }

    frame.render(() => {
      renderer.render(scene, camera);
    }, true);

    animate(
        cube.rotation,
        {  y: rad(720), z: rad(360) },
        { duration: 10, repeat: Infinity, ease: "linear" }
    )
    
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="cube"></div>;
};