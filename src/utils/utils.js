import Cookies from "js-cookie";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from "../config/firebase";
import { formatDistanceToNow } from "date-fns";
import vCardJs from 'vcards-js';
import { CARD_IMAGE_PATH } from "./global";
import QRCode from 'qrcode';

export function generateUniqueName (id) {
    const uniqueName = `${id}_${Math.random().toString(36).substring(2, 9)}`;
    return uniqueName;
};

export function generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function groupList(data, keyName) {
    const groupMap = new Map();

    data.forEach(item => {
        const keyValue = item[keyName];
        if (!groupMap.has(keyValue)) {
            groupMap.set(keyValue, [item]);
        } else {
            groupMap.get(keyValue).push(item);
        }
    });

    return groupMap;
};

export function filterAndGroupList(data, keyName, value) {
    const groupMap = new Map();

    const filtered = data.filter((e)=>e.label.toLowerCase().includes(value.toLowerCase()))

    filtered.forEach(item => {
        const keyValue = item[keyName];
        if (!groupMap.has(keyValue)) {
            groupMap.set(keyValue, [item]);
        } else {
            groupMap.get(keyValue).push(item);
        }
    });
  
    return groupMap;
  }

export function checkCookies(){
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
        return true; 
    } else {
        return false; 
    }
}

export function clearCookies(){
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('redirect');
}


export async function uploadImage(folderName, fileName, objectData) {
    const blob = handleBase64Image(objectData);
    const storageRef = ref(storage, `${folderName}/${fileName}`);
    await uploadBytes(storageRef, blob);
}

export const handleBase64Image = (base64String) => {
    // Remove the "data:image/jpeg;base64," prefix
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    // Convert to a binary format
    const binaryString = atob(base64WithoutPrefix);

    // Create a Uint8Array from the binary string
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob object from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    return blob;
};

export const formatDateDistance = (dateString) => {
    const date = new Date(dateString);
    const distance = formatDistanceToNow(date, { addSuffix: true });
    return `${distance}`;
};

export function formCardLink(cardId){
    const location = window.location.origin;
    return `${location}/app/p/card/${cardId}`
}

export function generateVcard(cardData) {
    
    const card = vCardJs();

    if(cardData?.name?.firstName){
        card.firstName = cardData?.name?.firstName;
    } 
    if(cardData?.name?.middleName){
        card.middleName = cardData?.name?.middleName;
    } 
    if(cardData?.name?.lastName){
        card.lastName = cardData?.name?.lastName;
    } 
    if(cardData?.name?.prefix){
        card.namePrefix = cardData?.name?.prefix;
    } 
    if(cardData?.company?.companyName){
        card.organization = cardData?.company?.companyName;
    } 
    if(cardData?.company?.jobTitle){
        card.title = cardData?.company?.jobTitle;
    } 
    if(cardData?.company?.companyWebsite){
        card.workUrl = cardData?.company?.companyWebsite;
    } 
    if(cardData?.picture){
        card.photo.attachFromUrl(cardData.picture, 'JPEG');
    }
    if(cardData?.logo){
        card.logo.attachFromUrl(cardData.logo, 'JPEG');
    }
    if(cardData?.phoneNumber){
        card.cellPhone = cardData?.phoneNumber;
    } 
    if(cardData?.email){
        card.email = cardData?.email;
    } 
    if(cardData?.address){
        card.workAddress.label = 'Work Address';
    }
    if(cardData?.address?.city){
        card.workAddress.city = cardData?.address.city;
    } 
    if(cardData?.address?.state){
        card.workAddress.stateProvince = cardData?.address.state;
    } 
    if(cardData?.address?.country){
        card.workAddress.countryRegion = cardData?.address.country;
    } 
    if(cardData?.address?.pincode){
        card.workAddress.postalCode = cardData?.address.pincode;
    } 
    if(cardData?.address?.addressLine1){
        card.workAddress.street = cardData?.address.addressLine1;
    } 

    const vcfData = card.getFormattedString();

    return vcfData;
}

export function downloadFile(data, fileName){

    const blob = new Blob([data], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.vcf`);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export function formatDate(dateString){

    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return formattedDate;
}

export function formatDateMin(dateString){

    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    return formattedDate;
}

export async function downloadImageUrl(imageUrl){
    const res = await fetch(imageUrl);
    const blob = await res.blob()
    const url =  window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bizcard-virtual-background.jpg');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}

export function getImage(id, type){
    return `${CARD_IMAGE_PATH}${id}%2F${type}.jpg?alt=media`;
}

export async function downloadImageWithText(imageSrc, cardData, imageName = 'downloaded_image') {
    try {
      const imageFetch = await fetch(imageSrc);
      const imageBlob = await imageFetch.blob();
      const image = await createImageBitmap(imageBlob);

      const name = `${cardData.name?.firstName??''} ${cardData.name?.lastName??''}`;
  
      // Create an off-screen canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0);

      // Generate QR code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, 'qrText', {
        width: 390, // Set as needed
        margin: 2
      });

      // Calculate position for QR code to be in the top right corner
      const qrX = canvas.width - qrCanvas.width - 100; // 10px from the right edge
      const qrY = 100; // 10px from the top edge

      ctx.drawImage(qrCanvas, qrX, qrY);
    
      // Add text over the image
      ctx.font = '98px serif'; // Customize the font size and style
      ctx.fillStyle = 'white'; // Text color
      ctx.fillText(name, 100, 200); // Customize text position
  
      // Convert canvas to image and download
      canvas.toBlob(function(blob) {
        const imageURL = URL.createObjectURL(blob);
  
        // Create a temporary link and trigger the download
        const tempLink = document.createElement('a');
        tempLink.href = imageURL;
        tempLink.setAttribute('download', imageName);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
  
        // Clean up the blob URL
        URL.revokeObjectURL(imageURL);
      }, 'image/jpeg'); // You can adjust the format
    } catch (error) {
      console.error('Failed to download the image:', error);
    }
  }
  