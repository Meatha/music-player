import React from 'react';
import styles from './index.module.less';

class Music extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isPlay: false,
      url: 'https://raw.githubusercontent.com/nnngu/SharedResource/master/music/%E7%AB%A5%E8%AF%9D%E9%95%87.mp3'
    };
    this.audio = React.createRef();
    this.handleControl = this.handleControl.bind(this);
  };
  handleControl () {
    const { isPlay } = this.state;
    if (isPlay) {
      this.audio.current.pause();
    } else {
      this.audio.current.play();
    }
    this.setState({
      isPlay: !isPlay
    });
  };
  componentDidMount () {
    const current = this.audio.current;
    current.addEventListener("canplaythrough", () => {
      current.play();
      this.setState({
        isPlay: true
      });
    }, false)
  }
  render () {
    const { url, isPlay } = this.state;
    const style = isPlay ? styles.musicRotate : styles.musicStop;

    return (
      <div
        className={ style }
        onClick={ this.handleControl }
      >
        <audio 
          ref={ this.audio }
          preload="preload"
          loop="loop"
          src={ url }
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
}

export default Music;