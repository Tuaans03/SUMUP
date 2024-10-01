const fs = require("fs");
const path = require("path");

const writeAddresses = async (chainId, addresses) => {
  const prevAddresses = await getAddresses(chainId);
  const newAddresses = {
    ...prevAddresses,
    ...addresses,
  };

  return new Promise((resolve, reject) => {
    fs.writeFile(
      getFilePath(getNetworkName(chainId)),
      JSON.stringify(newAddresses, null, 2),
      (err) => {
        if (err) {
          console.error("Lỗi khi ghi tệp:", err);
          reject(err);
        } else {
          console.log("Địa chỉ contract đã được ghi vào tệp thành công.");
          resolve();
        }
      }
    );
  });
};

const getFilePath = (networkName) => {
  return path.join(__dirname, `../addresses-${networkName}.json`);
};

const getNetworkName = (chainId) => {
  switch (chainId) {
    case 1:
      return "ethereum";
    case 11155111:
      return "sepolia";
    case 31337:
      return "localhost";
    default:
      return "unknown";
  }
};

const getAddresses = async (chainId) => {
  const networkName = getNetworkName(chainId);
  const filePath = getFilePath(networkName);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`Tệp ${filePath} không tồn tại, trả về một đối tượng rỗng.`);
      resolve({});
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const fileContent = data.toString().trim();
        if (fileContent === "") {
          console.warn(`Tệp ${filePath} trống, trả về một đối tượng rỗng.`);
          resolve({});
        } else {
          try {
            const parsedData = JSON.parse(fileContent);
            resolve(parsedData);
          } catch (parseError) {
            console.error(
              `Lỗi khi phân tích cú pháp JSON trong tệp ${filePath}`
            );
            reject(new Error("Lỗi khi phân tích tệp JSON"));
          }
        }
      }
    });
  });
};

module.exports = {
  writeAddresses,
  getAddresses,
};
