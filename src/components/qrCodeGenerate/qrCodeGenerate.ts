import QRCode from "qrcode";

/**
 * Genera un código QR basado en una URL proporcionada.
 * @param url URL que se incluirá en el código QR.
 * @returns La representación en base64 del QR generado.
 */
export const generateQRCode = async (url: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(url, {
      width: 300, // Tamaño del QR
      margin: 2, // Margen alrededor del QR
    });
  } catch (error) {
    console.error("Error generando el código QR:", error);
    throw new Error("No se pudo generar el código QR.");
  }
};
