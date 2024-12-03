import React, { useState } from "react";
import { create } from "../services/CheckingAccountService";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleNextStep = async () => {
        if (!isChecked) {
            alert("Lütfen şartları kabul ettiğinizi onaylayın.");
            return;
        }

        setIsLoading(true);

        try {
            const accountData = {
                bankCode: "", // Örnek veri
                branchCode: "",
                branchName: "",
                ibanNo: "",
                accountNo: "",
                accountName: "",
                balance: 0,
                lockedBalance: 0,
                isActive: true,
                accountType: "CHECKING",
                createdAt: new Date().toISOString(),
            };

            const response = await create();

            if (response.success) {
                alert("Hesabınız başarıyla oluşturuldu!");
                navigate("/createDebitCard");
                console.log("Hesap ID:", response.id);
            } else {
                alert("Bir hata oluştu: " + response.message);
            }
        } catch (error) {
            console.error("Hesap oluşturulamadı:", error.message);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Hesap Oluşturma Şartları</h1>
                <p style={styles.text}>
                    Yeni bir hesap oluşturmak için aşağıdaki şartları okumanız ve kabul etmeniz gerekmektedir:
                </p>
                <div style={styles.termsContainer}>
                    <p style={styles.terms}>
                        1. Hesabınız yalnızca bireysel kullanım içindir.<br />
                        2. Hesap bilgilerinizin güvenliği sizin sorumluluğunuzdadır.<br />
                        3. Banka gerekli durumlarda ek bilgi talep edebilir.<br />
                        4. Hesap sadece belirli limitlerde işlem yapabilir.<br />
                        5. Banka, hesabın kullanım koşullarında değişiklik yapma hakkına sahiptir.<br />
                        6. Şartları kabul ederek, tüm yasal ve etik sorumlulukları üstlenmiş olursunuz.<br />
                        7. Hesap bilgilerinizin doğruluğundan siz sorumlusunuz.<br />
                        8. Hesap üzerinden yapılacak tüm işlemler sizin sorumluluğunuzdadır.<br />
                        9. Hesabınızda yapılan her türlü işlem kaydedilir ve denetim amaçlı kullanılabilir.<br />
                        10. Hesap bilgilerinizi başka kişilerle paylaşmamanız tavsiye edilir.<br />
                    </p>
                </div>

                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        style={styles.checkbox}
                    />
                    Okudum ve kabul ediyorum.
                </label>

                <button
                    onClick={handleNextStep}
                    disabled={isLoading}
                    style={{
                        ...styles.button,
                        backgroundColor: isChecked ? "#ee3124" : "#ddd",  // Red button color
                        cursor: isChecked ? "pointer" : "not-allowed",
                    }}
                >
                    {isLoading ? "Hesap Oluşturuluyor..." : "Sonraki Adım"}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f2f2f2",
        padding: "20px",
    },
    card: {
        width: "100%",
        maxWidth: "700px",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
    },
    header: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: "20px",
    },
    text: {
        fontSize: "16px",
        color: "#555",
        textAlign: "center",
        marginBottom: "20px",
    },
    termsContainer: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    terms: {
        fontSize: "14px",
        color: "#777",
        lineHeight: "1.8",
        textAlign: "left",
        marginBottom: "20px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        color: "#555",
        marginBottom: "20px",
        cursor: "pointer",
    },
    checkbox: {
        marginRight: "10px",
        accentColor: "#FF5252", // Matching checkbox with button red color
    },
    button: {
        width: "100%",
        padding: "12px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        transition: "all 0.3s ease",
        cursor: "pointer",
    },
};

export default TermsPage;
