export default () => {
    const div = document.createElement('div');
    div.id = 'te-search';
    div.innerHTML = `
    <div class="te-chatSearch-bg" onclick="document.querySelector('#te-search').style.display = 'none'"></div>
    <div class="te-chatSearch-container">
      <div class="te-chatSearch-header">
        <div class="te-chatSearch-header-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="var(--te-purple-color)"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.25 11.8195C14.25 13.8522 12.6022 15.5 10.5694 15.5C8.53673 15.5 6.88889 13.8522 6.88889 11.8195C6.88889 9.78674 8.53673 8.1389 10.5694 8.1389C12.6022 8.1389 14.25 9.78674 14.25 11.8195ZM10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.386 11.4317C12.2943 11.4581 12.1974 11.4722 12.0972 11.4722C11.5219 11.4722 11.0556 11.0059 11.0556 10.4306C11.0556 10.3303 11.0697 10.2334 11.0961 10.1417C10.9501 10.1036 10.7969 10.0833 10.6389 10.0833C9.6417 10.0833 8.83333 10.8917 8.83333 11.8889C8.83333 12.8861 9.6417 13.6944 10.6389 13.6944C11.6361 13.6944 12.4444 12.8861 12.4444 11.8889C12.4444 11.7309 12.4242 11.5777 12.386 11.4317Z"
            ></path>
          </svg>
          <p>Search Mode</p>
        </div>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          class="te-close-button-icon"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          onclick="document.querySelector('#te-search').style.display = 'none'"
          style="
            width: 25px;
            height: 25px;
            fill: var(--te-gray-color-light);
            transition: all 0.2s ease 0s;
          "
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="te-chatSearch-content">
        <div class="te-chatSearch-input-container">
          <input
            type="text"
            class="te-chatSearch-input"
            placeholder="Username starts with"
          />
          <div class="te-chatSearch-input-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
              />
            </svg>
          </div>
        </div>
        <div class="te-chatSearch-input-container">
          <input
            type="text"
            class="te-chatSearch-input"
            placeholder="Message includes"
          />
          <div class="te-chatSearch-input-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    `;
    return div;
};
