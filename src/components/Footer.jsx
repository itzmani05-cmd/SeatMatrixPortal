import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "16px 24px",
        backgroundColor: "#001529",
        color: "#ffffff",
        textAlign: "center",
        fontSize: "14px"
      }}
    >
      <div style={{ lineHeight: "1.6" }}>
        <p style={{ margin: 0 }}>
          © 2025 TNEA. All rights reserved.
        </p>
        <p style={{ margin: 0 }}>
          For better experience, please use a laptop or PC.
        </p>
        <p style={{ margin: 0 }}>
          For any queries, please contact: 
          <strong> Balaram</strong> (9446543585),
          <strong> Manikandan</strong> (6369925623)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
