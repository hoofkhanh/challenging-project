# Đây là hỉnh ảnh trang web của em (This is my image of web)

*****************************************************************************************************************************************************
- **1. Đây là trang để nhập số điện thoại và access code.**
- **1. This is the page to enter your phone number and access code.**
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/e5240b13-1278-4fe4-936c-a4f1d3645961)
*****************************************************************************************************************************************************

*****************************************************************************************************************************************************
- **2. Đây là trang để nhập tìm kiếm người dùng theo login (trong input ở trang web đã nhập là 'khanh') và nhập per_page là số lượng hiển thị user của mỗi trang (trong input ở trang web đã nhập là '10') và có một số phân trang bên dưới (max trang hiển thị chỉ là 10 trang) nếu muốn hiển thị thêm thì bấm vào 'Next' cũng như muốn lùi trang hiển thị thì bấm vào 'Previous'. Ở cột favorite có nghĩa là nếu đã yêu thích user đó thì hiển thị màu đỏ còn chưa thì không màu, có thể click vào để thêm vào yêu thích. Có thể nhấn nút yêu thích (trái tim) hoặc có thể bỏ yêu thích cũng được.**
- **2. This is the page to enter user search by login (in the input on the entered website is 'khanh') and enter per_page as the number of user displays of each page (in the input on the entered website is '10') and There is some pagination below (max page display is only 10 pages). If you want to display more, click 'Next' and if you want to move back the displayed page, click 'Previous'. In the favorite column, it means that if you already like that user, it will be displayed in red. Otherwise, it will be colorless. You can click to add it to your favorites. You can press the favorite button (heart) or you can un-favorite.**
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/ba2ca494-542b-4575-a0d8-901ac0092f70)
*****************************************************************************************************************************************************

*****************************************************************************************************************************************************
- **3. Đây là trang khi nhấn vào hình ảnh hồ sơ của người đang sử dụng bao gồm số điện thoại ở đầu trang và những người dùng đã thêm vào yêu thích và cũng có thể bỏ yêu thích hoặc yểu thích lại (nếu đã bỏ yêu thích).**
- **3. This is the page when clicking on the profile image of the current user including the phone number at the top of the page and users who have added to favorites and can also un-favorite or re-favorite (if unfavorited). prefer).**
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/a51585ce-1c08-456e-8380-3a5b379332bd)
*****************************************************************************************************************************************************

- **4. Cấu trúc của WEB backend (Structure of WEB backend).** <br>
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/d61d6dc1-1f6f-489b-bcc3-8ab87185551d)
*****************************************************************************************************************************************************
- Ở file config.js trong challenging-express có phần config của firebase. Có thể collection là phone_numbers và favorite_github_users (Bạn có thể thay thế bằng config của bạn ổ biến firebaseConfig)
- In the config.js file in challenging-express, there is a firebase config section. Maybe the collection is phone_numbers and favorite_github_users (You can replace it with your config variable firebaseConfig)
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/c84f7358-b6b9-47bc-aebb-67475cc76ca8)

- Ở file index.js là những phần đường dẫn api, folder controller là sẽ tiếp nhận những api (nhận tham số) và sẽ điều hướng qua folder service để xử lý những logic phức tạp.
- Ở file file GithubUserService.js có một biến tên là TOKEN chính là TOKEN dùng để bỏ giới hạn của api github (nếu không muốn sử dụng thì bạn có thể bỏ TOKEN đi bỏ nhừng phần call api bằng axios nào có headers chứa TOKEN thì hãy xóa đi), còn nếu muốn sử dụng thì hãy vào link https://github.com/settings/apps sao đó vào Personal accesss token và chọn Fine-grained tokens vào genrerate new token sau đó lấy và dán vào biến TOKEN ở code
- In the index.js file are the api paths, the controller folder will receive the api (receive parameters) and will navigate through the service folder to handle complex logic.
- In the GithubUserService.js file, there is a variable named TOKEN which is the TOKEN used to remove the limit of the github api (if you do not want to use it, you can remove the TOKEN and remove the api calls using axios which headers contain TOKEN. Please delete it), but if you want to use it, go to the link https://github.com/settings/apps, then go to Personal accesss token and select Fine-grained tokens, go to genrerate new token, then take it and paste it into the TOKEN variable in code
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/5092d5a3-414d-4661-89d8-46c23209b3fa)
*****************************************************************************************************************************************************
 
- Ở file PhoneNumberService.js có một function là initRequest và có biến options chính là config api dùng để sms để gửi tin nhắn của https://www.infobip.com (chỉ có thể gửi tin nhắn cho đến số điện thoại người dùng đăng kí api và một vài người giới hạn). Hãy vào đăng kí nếu account nếu bạn muốn test thử.
- In the PhoneNumberService.js file, there is a function called initRequest and the options variable is the api config used for sms to send messages from https://www.infobip.com (can only send messages to the user's phone number). Register for the API and a limited number of people). Please register for an account if you want to test it out.
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/258f9871-a665-4492-931b-79ace97f86dd)
*****************************************************************************************************************************************************

- **5. Cấu trúc của WEB frontend (Structure of WEB frontend).**
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/330205f9-a264-4c4d-b894-699ce38b7653)
*****************************************************************************************************************************************************
- Ở folder components là sẽ chứa các folder component nhỏ như trang PhoneNumberForm và css của nó dùng để nhập số điện thoại và access token, folder UserGithub trang UserGithub dùng để dùng api user của github để search theo login per_page là số lượng hiển thị và trang của api sẽ hiển thị và Pagination có nghĩa là phân trang. foldler FavoriteUser là chứa các user đã nhấn yêu thích
- Ở folder asset sẽ chứa các hình ảnh để hiển thị.
- Ở phần App.jsx sẽ chứa các component và có link đường dẫn của các trang.
- The components folder will contain small component folders such as the PhoneNumberForm page and its css used to enter phone numbers and access tokens, the UserGithub folder on the UserGithub page is used to use github's user api to search by login per_page which is the number of displays and api's page will display and Pagination means pagination. Folder FavoriteUser contains users who have clicked favorites.
- The assets folder will contain images to display.
- The App.jsx section will contain components and links to the pages.
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/52cfa538-2a77-40bd-a063-8517bf52d53e)

- **6.Cách sử dụng Web backend (how to use backend)**
- Hãy download phần challenging-express về máy và open trong vscode, hãy vào terminal và gõ 'npm i' để install tất cả thư viện về
- Đầu tiên hãy đọc phần 3 Cấu trúc Web backend để biết phần nào nên thay thế để run được project, tiếp theo mở cmd hoặc git bash truy cập vào project challenging-express, sau đó gõ chữ "nodemon index.js" và sau đó nếu cmd hiển thị chữ Up thì có nghĩa là project đã được run ở port 4000 thành công <br/>
- Download the challenging-express part to your device and open it in vscode, go to the terminal and type 'npm i' to install all the libraries.
- First, read part 3 Web backend structure to know which parts should be replaced to run the project, next open cmd or git bash to access project challenging-express, then type "nodemon index.js" and then If cmd displays the word Up, it means the project has been run on port 4000 successfully <br/>
![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/875fa055-d895-493c-b883-67ca4a3e2d7b)
*****************************************************************************************************************************************************

- **7.Cách sử dụng Web frontend (how to use frontend)**
- Hãy download phần challenging-react về máy và open trong vscode, hãy vào terminal và gõ 'npm i' để install tất cả thư viện về
- Hãy đọc phần 5 để biết cấu trúc rõ hơn và sau đó hãy mở terminal trong vscode và gõ "npm run dev" sau đó project sẽ được run ở port 5173, giao diện đầu tiên chính là phần 1 (trang nhập số điện thoại và access code)
- Download the challenging-react part to your device and open it in vscode, go to the terminal and type 'npm i' to install all the libraries.
- Please read part 5 to know the structure more clearly and then open the terminal in vscode and type "npm run dev" then the project will be run at port 5173, the first interface is part 1 (phone number input page and access code)
- ![image](https://github.com/hoofkhanh/challenging-project/assets/124868697/6e77fa4a-2b4b-4f9b-b9ff-a66a2dc86bff)






