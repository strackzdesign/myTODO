window.addEventListener('load', () => {

    // Create new object from the form, the object will be sent to the localStorage and DOM;
    $(`#formadd`).on("click", (e) => {
        e.preventDefault();
        let currentDate = new Date();

        const formContent = [{
            checked: false,
            text: formtext.value,
            date: `${currentDate.toLocaleString(navigator.language, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}`
        }]

        let dataJSON = localStorage.getItem('todoList');

        if(dataJSON !== null) {
            let currentData = JSON.parse(dataJSON);
            currentData.push(formContent);
            localStorage.setItem('todoList', JSON.stringify(currentData));
        } else {
            localStorage.setItem('todoList', JSON.stringify([formContent]));
        }
        
        formtext.value = null; // Reset text
        createItems(true, formContent);
    });

    /**
     * This is the main function, createItems will create everyitem and refresh the DOM itself.
     * If click is true, it means that i will only append or create events of the item that i just submitted. 
     * Else, i will force the verification, appends and creation of events of every item in the TODO list everytime we refresh or join the website.
     * 
     * @param {boolean} click 
     * @param {object} formContent 
     */
    const createItems = (click, formContent) => {
        let currentData = JSON.parse(localStorage.getItem('todoList'));

        if (currentData !== null) {
            if(click) {
                $('.content_todo').append(`<div class="todo" id="todo-${currentData.length}"></div>`);
                $(`#todo-${currentData.length}`).append(`<div class="todocheck_content"><input type="checkbox" class="todocheck" id="check-${currentData.length - 1}"><input type="submit" class="todoremove" value="X" id="remove-${currentData.length - 1}"></div>`);
                $(`#todo-${currentData.length}`).append(`<div class="todotext_content"><p class="todotext">${formContent[0].text}<br><br><span class="tododate">${formContent[0].date}</span></p></div>`);

                checkEvent(`check-${currentData.length - 1}`);
                deleteEvent(`remove-${currentData.length - 1}`);
            } else {
                currentData.forEach((v, i) => {
                    $('.content_todo').append(`<div class="todo" id="todo-${i + 1}"></div>`);
                    if (v[0].checked) {
                        $(`#todo-${i + 1}`).append(`<div class="todocheck_content"><input type="checkbox" class="todocheck" id="check-${i}" checked><input type="submit" class="todoremove" value="X" id="remove-${i}"></div>`);
                    } else {
                        $(`#todo-${i + 1}`).append(`<div class="todocheck_content"><input type="checkbox" class="todocheck" id="check-${i}"><input type="submit" class="todoremove" value="X" id="remove-${i}"></div>`);
                    }
                    $(`#todo-${i + 1}`).append(`<div class="todotext_content"><p class="todotext">${v[0].text}<br><br><span class="tododate">${v[0].date}</span></p></div>`);

                    checkEvent(`check-${i}`);
                    deleteEvent(`remove-${i}`);
                })
            }
        } else {
            console.log("You didn't add anything to your personal TODO list!");
        }
    }

    //Function that will manage the creation of every (check TODO) click event / Inside the event the code will switch the value of the object to false/true.
    const checkEvent = (id) => {
        $(`#${id}`).on("click", () => {
            let currentData = JSON.parse(localStorage.getItem('todoList'));
            let currentEvent = id.replace('check-', '');

            currentData.forEach((v, i) => {
                if (Number(currentEvent) === i) {
                    v[0].checked = !v[0].checked;
                    localStorage.setItem('todoList', JSON.stringify(currentData));
                }
            })
        })
    }

    //Function that will manage the creation of every (delete TODO) click event / Inside the event the code will remove the current item.
    const deleteEvent = (id) => {
        $(`#${id}`).on("click", () => {
            let currentData = JSON.parse(localStorage.getItem('todoList'));
            let currentEvent = id.replace('remove-', '');

            currentData.forEach((v, i) => {
                if (Number(currentEvent) === i) {
                    currentData.splice(i, 1);
                    localStorage.setItem('todoList', JSON.stringify(currentData));
                    location.reload(); // Page reload to refresh the positions of the objects in the DOM/LocalStorage.
                }
            })
        })

    }

    createItems();

})