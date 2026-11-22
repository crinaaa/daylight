import Header from "../components/Header";

function Dashboard() 
{
    return (
        <main className="dashboard">
            <Header title="Good afternoon, beloved user!"
            subtitle="Take a moment for yourself. How are you feeling today?" 
            />

            <section className="stats">
                <div className="stat-card">
                    <span className="stat-icon">🔥</span>
                    <p>Current streak</p>
                    <h2>0 days</h2>
                </div>

                <div className="stat-card">
                    <span className="stat-icon">⭐</span>
                    <p>Total experience</p>
                    <h2>0 XP</h2>
                </div>

                <div className="stat-card">
                    <span className="stat-icon">📖</span>
                    <p>Journal entries</p>
                    <h2>0 entries</h2>
                </div>
            </section>

            <section className="writing-card">
                <div>
                    <p className="eyebrow">YOUR DAILY MOMENT</p>
                    <h2>A little time for yourself.</h2>
                    <p>
                        Your thoughts deserve a place to live.
                        Start writing when you're ready.
                    </p>
                </div>

                <button className="write-button">
                    + Write an entry
                </button>
            </section>

            <section className="bottom-section">
                <div className="content-card">
                    <h2>Your activity</h2>
                    <p>Your journaling activity will appear here</p>
                </div>

                <div className="content-card">
                    <h2>Recent entries</h2>
                    <p>Your latest thoughts will appear here.</p>
                </div>
            </section>
        </main>
    );
}

export default Dashboard