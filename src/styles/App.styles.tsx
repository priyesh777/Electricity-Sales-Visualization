import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h3 {
    color: #4d3550;
    font-weight: 400;
    font-size: 1.6em;
    margin: 0;
  }

  p {
    font-weight: 600;
    color: #999;

    margin: 0;
    font-size: 14px;
  }

  > div {
    min-height: 480px;
    margin: 2rem;
    background: #fff;
    border-radius: 36px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  .status-bar {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

    .status-text {
      font-size: 16px;
      font-weight: 600;
    }

    .icons {
      display: flex;
      align-items: center;
      opacity: 0.7;

      img {
        display: flex;
        outline: none;
        border: none;
      }
    }
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    min-width: 720px;
    min-height: 480px;
    position: relative;

    .top-chart {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      border-radius: 32px 32px 0 0;

      .header-box {
        height: auto;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        padding: 15px 40px;
      }
    }

    .bottom-chart {
      height: auto;
      padding: 40px 30px 45px 30px;
    }
  }

  > div:last-child {
    min-width: 720px;
    min-height: 480px;
    position: relative;

    .top-table {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 32px 32px 0 0;

      .header-box {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        padding: 15px 40px;
      }
    }

    .bottom-table {
      height: auto;
      padding: 10px 30px 0 30px;
    }
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    width: 100%;
    > div:first-child,
    > div:last-child {
      width: 45%;
    }

    > div:first-child {
      .bottom-chart {
        padding: 10px 15px 50px 15px;
      }
    }
    > div:last-child {
      .bottom-table {
        padding: 10px 15px 0 15px;
      }
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    > div:first-child {
      width: 90%;
      height: auto;

      margin-bottom: 60px;

      .top-chart {
        background-size: auto 400px;
        .header-box {
          width: 90%;
          padding: 15px 20px;
          border-radius: 16px;
          h3 {
            font-size: 1.4em;
          }
        }
      }
      .bottom-chart {
        padding: 10px 15px 50px 15px;
      }
    }

    > div:last-child {
      width: 90%;
      height: auto;

      .top-table {
        .header-box {
          width: 90%;
          padding: 15px 20px;
          border-radius: 16px;
          h3 {
            font-size: 1.4em;
          }
        }
      }
      .bottom-table {
        padding: 10px 15px 0 15px;
      }
    }
  }
`;

//Loading

const ldsRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Ring = styled.div`
  display: inline-block;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
`;

export const RingItem = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 34px;
  height: 34px;
  border: 4px solid #23292d;
  border-radius: 50%;
  animation: ${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #23292d transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const Divider = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 10px 0 10px 0;
`;
