var React = require('react');
var Clock=require('Clock');
var Controls = require('Controls');
var Timer=React.createClass({
        getInitialState:function(){
                return {
                        count:0,
                        countdownStatus:'paused'
                };
        },
        componentDidUpdate:function(prevProps,prevState){
                if(prevState.countdownStatus !== this.state.countdownStatus){
                        switch(this.state.countdownStatus){
                                case 'started':
                                        this.startTimer();
                                        break;
                                case 'stopped':
                                        this.setState({
                                                count:0
                                        });
                                case 'paused':
                                        clearInterval(this.timer)
                                        this.timer=undefined;
                                        break;
                        }
                }
        },
        startTimer : function(){
                this.timer = setInterval( ()=>{
                        var newCount=this.state.count+1;
                        this.setState({
                                count:newCount
                        });
                },1000);                
        },
        handleStatusChange:function(newStatus){
                this.setState({
                       countdownStatus:newStatus 
                });
        },
        render:function(){
                return(
                        <div>
                                <h1 className="page-title">Timer App</h1>
                                <Clock totalSeconds={this.state.count} />
                                <Controls countdownStatus={this.state.countdownStatus} onStatusChange={this.handleStatusChange} whoAmI="timer"/>
                        </div>
                );
        }
});

module.exports=Timer;
