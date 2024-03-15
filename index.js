import fetch from 'node-fetch';

// Function to call the first API
async function callFirstAPI() {
    try {
        // Thay url này bằng url trên Lava: https://points.lavanet.xyz/profile
        const response = await fetch('https://eth1.lava.build/lava-referer-c462bd4d-bead-4c72-8a7e-2cf1b853fcd6/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "eth_getBalance",
                "params": [
                    "0x567aD8cD138fC243ad239A10fa13Bc5606DAD5d1", // Địa chỉ ví
                    "latest"
                ],
                "id": 3
            })
        });
        const data = await response.json();
        console.log('First API Response:', data);
    } catch (error) {
        console.error('Error calling first API:', error);
    }
}

// Function to call the second API
async function callSecondAPI() {
    try {
        // Thay url này bằng url trên Lava: https://points.lavanet.xyz/profile
        const response = await fetch('https://near.lava.build/lava-referer-c462bd4d-bead-4c72-8a7e-2cf1b853fcd6/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "block",
                "params": {
                    "finality": "final"
                },
                "id": 1
            })
        });
        const data = await response.json();
        console.log('Second API Response:', data);
    } catch (error) {
        console.error('Error calling second API:', error);
    }
}

// Function to call APIs alternately every 5 seconds indefinitely
async function callAPIsAlternately() {
    let isFirstAPI = true;
    while (true) {
        if (isFirstAPI) {
            await callFirstAPI();
        } else {
            await callSecondAPI();
        }
        isFirstAPI = !isFirstAPI; // Chuyển đổi giữa hai API
        await new Promise(resolve => setTimeout(resolve, 5000)); // Delay 5 giây
    }
}

// Gọi hàm để bắt đầu gọi luân phiên API mỗi 5 giây
callAPIsAlternately();
