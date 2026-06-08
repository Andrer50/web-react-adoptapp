import { Mascota } from '@/core/pets/interfaces';
import { Adopcion } from '@/core/adoptions/interfaces';

export function downloadAdoptionCertificate(pet: Mascota, adoption: Adopcion) {
  const adopterName = adoption.adoptante_detalle
    ? `${adoption.adoptante_detalle.first_name || ''} ${adoption.adoptante_detalle.last_name || ''}`.trim() || adoption.adoptante_detalle.username
    : 'Adoptante Registrado';
  
  const adopterEmail = adoption.adoptante_detalle?.email || 'N/A';
  const adoptionDate = new Date(adoption.fecha_adopcion).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const petPhoto = pet.fotos?.[0]?.url_imagen || '';

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (!printWindow) {
    alert('Por favor permite las ventanas emergentes para descargar el certificado.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Certificado de Adopción - ${pet.nombre}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Montserrat:wght@300;400;600;700&family=Pinyon+Script&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #faf6f0;
          font-family: 'Montserrat', sans-serif;
          color: #3e2723;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .certificate-container {
          width: 800px;
          height: 560px;
          margin: 30px auto;
          padding: 30px;
          border: 15px double #8e4e14;
          background-color: #ffffff;
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          box-sizing: border-box;
        }

        .inner-border {
          border: 2px solid #9f402d;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 25px;
          text-align: center;
          position: relative;
        }

        .header {
          font-family: 'Cinzel', serif;
          font-size: 26px;
          color: #9f402d;
          letter-spacing: 4px;
          margin-bottom: 5px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .subheader {
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #8e4e14;
          font-weight: 600;
          margin-bottom: 25px;
        }

        .certify-text {
          font-size: 14px;
          font-style: italic;
          color: #5d4037;
          margin-bottom: 15px;
        }

        .pet-name {
          font-family: 'Pinyon Script', cursive;
          font-size: 50px;
          color: #9f402d;
          margin: 10px 0;
          line-height: 1;
        }

        .pet-details {
          font-size: 12px;
          color: #7d5a50;
          margin-bottom: 20px;
        }

        .adopter-title {
          font-size: 13px;
          color: #5d4037;
          margin-bottom: 5px;
        }

        .adopter-name {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: #8e4e14;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .footer-text {
          font-size: 11px;
          color: #8d6e63;
          max-width: 500px;
          margin: 0 auto 30px auto;
          line-height: 1.6;
        }

        .meta-info {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
        }

        .meta-item {
          width: 180px;
        }

        .line {
          border-top: 1px solid #bcaaa4;
          margin-bottom: 8px;
        }

        .meta-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #7d5a50;
        }

        .meta-value {
          font-size: 11px;
          font-weight: 600;
          color: #3e2723;
        }

        .gold-seal {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle, #f2a65e 0%, #8e4e14 100%);
          border: 3px double #fff;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          position: relative;
        }

        .gold-seal::before {
          content: "♥";
          font-size: 32px;
          color: #fff;
        }

        .pet-photo-container {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 2px solid #8e4e14;
          overflow: hidden;
          background-color: #f5f5f5;
        }

        .pet-photo {
          width: 100%;
          height: 100%;
          object-cover: cover;
        }

        @media print {
          body {
            background-color: #ffffff;
          }
          .certificate-container {
            box-shadow: none;
            margin: 0;
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <div class="inner-border">
          ${petPhoto ? `
          <div class="pet-photo-container">
            <img class="pet-photo" src="${petPhoto}" alt="${pet.nombre}" />
          </div>
          ` : ''}
          
          <div class="header">Certificado de Adopción</div>
          <div class="subheader">AdoptApp • Salvando Huellitas</div>
          
          <div class="certify-text">Por el presente documento se hace constar con alegría la adopción de</div>
          <div class="pet-name">${pet.nombre}</div>
          <div class="pet-details">Especie: <strong>${pet.especie}</strong> | Raza: <strong>${pet.raza}</strong> | Color: <strong>${pet.color}</strong></div>
          
          <div class="adopter-title">Quien ha sido recibido en su nuevo hogar por su cariñoso adoptante</div>
          <div class="adopter-name">${adopterName}</div>
          
          <div class="footer-text">
            Gracias por brindarle una segunda oportunidad, por abrir las puertas de tu hogar y prometer cuidarle, respetarle y quererle por el resto de sus días. ¡Juntos hacemos la diferencia!
          </div>

          <div class="meta-info">
            <div class="meta-item">
              <div class="line"></div>
              <div class="meta-label">Fecha de Adopción</div>
              <div class="meta-value">${adoptionDate}</div>
            </div>
            
            <div class="meta-item">
              <div class="gold-seal"></div>
            </div>

            <div class="meta-item">
              <div class="line"></div>
              <div class="meta-label">Firma Autorizada</div>
              <div class="meta-value">AdoptApp Directiva</div>
            </div>
          </div>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
