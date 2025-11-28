import React from "react";
import {
	Box,
	Grid,
	Card,
	CardHeader,
	CardContent,
	Typography,
	LinearProgress,
	Chip,
	List,
	ListItem,
	ListItemText,
	Divider,
	Stack,
	Button,
	Avatar,
} from "@mui/material";

// Dashboard component: Recommended career paths, identified skill gaps,
// curated learning resources and visual progress indicators.
export default function Dashboard() {
	// Sample/mock data — replace these with API-driven values later.
	const careerPaths = [
		{
			title: "AI / ML Engineer",
			match: 78,
			level: "High Potential",
			description: "Work on ML models, data pipelines and deployable AI features.",
		},
		{
			title: "Data Analyst",
			match: 65,
			level: "Good Fit",
			description: "Analyze business data, build dashboards and run experiments.",
		},
		{
			title: "Full-Stack Developer",
			match: 52,
			level: "Moderate Fit",
			description: "Ship features end-to-end across frontend and backend.",
		},
	];

	const skillGaps = [
		{ skill: "Python for Data Science", current: 40, required: 80 },
		{ skill: "Machine Learning Basics", current: 30, required: 75 },
		{ skill: "SQL & Databases", current: 55, required: 80 },
		{ skill: "Statistics & Probability", current: 35, required: 70 },
	];

	const resources = {
		courses: [
			{ title: "Intro to Machine Learning", provider: "Coursera", duration: "4 weeks" },
			{ title: "SQL for Data Analysis", provider: "Udemy", duration: "6 hours" },
		],
		articles: [
			{ title: "How to Choose Your AI Career Path", provider: "Medium" },
			{ title: "Understanding Bias & Variance", provider: "Analytics Vidhya" },
		],
	};

	const overallProgress = 42;
	const weeklyProgress = [20, 40, 60, 30, 70, 50, 80];

	return (
		<Box
			sx={{
				p: { xs: 2, md: 4 },
				minHeight: "100vh",
				background: "linear-gradient(to bottom right, #d4edf1ff, #acd2ebd8)",
				color: "#0f172a",
			}}
		>
			<Typography variant="h4" component="h1" fontWeight={800} sx={{ mb: 1 }}>
				Progress Tracking Dashboard
			</Typography>

			<Typography sx={{ color: "#374151", mb: 3 }}>
				A single place to track recommended career paths, identified skill gaps,
				curated learning resources and a quick visual of your overall progress.
			</Typography>

			<Grid container spacing={3}>
				{/* Recommended Career Paths */}
				<Grid item xs={12} md={6}>
					<Card sx={{ height: "100%" }}>
						<CardHeader title="Recommended Career Paths" />
						<CardContent>
							<Stack spacing={2}>
								{careerPaths.map((p, i) => (
									<Box key={p.title} sx={{ borderRadius: 2, p: 2, border: "1px solid rgba(0,0,0,0.06)" }}>
										<Stack direction="row" justifyContent="space-between" alignItems="center">
											<Box>
												<Typography fontWeight={700}>{p.title}</Typography>
												<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{p.description}</Typography>
											</Box>

											<Stack direction="column" spacing={1} alignItems="flex-end">
												<Chip label={p.level} size="small" color={i === 0 ? "primary" : "default"} />
												<Typography variant="caption" color="text.secondary">Match: {p.match}%</Typography>
											</Stack>
										</Stack>

										<LinearProgress variant="determinate" value={p.match} sx={{ mt: 2, height: 8, borderRadius: 3 }} />
										<Stack direction="row" spacing={1} sx={{ mt: 2 }}>
											<Button size="small" variant="contained">View Path</Button>
											<Button size="small" variant="outlined">Add to Plan</Button>
										</Stack>
									</Box>
								))}
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Skill Gaps */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardHeader title="Identified Skill Gaps" />
						<CardContent>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								Focus on these recommended skills to improve your fit for target roles.
							</Typography>

							<Stack spacing={2}>
								{skillGaps.map((g) => {
									const pct = Math.round((g.current / g.required) * 100);
									return (
										<Box key={g.skill}>
											<Stack direction="row" justifyContent="space-between" alignItems="center">
												<Typography fontWeight={600}>{g.skill}</Typography>
												<Typography variant="caption" color="text.secondary">{g.current}/{g.required}</Typography>
											</Stack>
											<LinearProgress variant="determinate" value={Math.min(pct, 100)} sx={{ mt: 1, height: 8, borderRadius: 3 }} />
											<Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>Progress: {pct}%</Typography>
										</Box>
									);
								})}
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Curated Resources */}
				<Grid item xs={12} md={8}>
					<Card>
						<CardHeader title="Curated Learning Resources" />
						<CardContent>
							<Stack spacing={2}>
								<Box>
									<Typography variant="subtitle1" fontWeight={700}>Courses</Typography>
									<List dense>
										{resources.courses.map((c, idx) => (
											<React.Fragment key={c.title}>
												<ListItem secondaryAction={<Chip label="Course" size="small" />}>
													<ListItemText primary={c.title} secondary={`${c.provider} — ${c.duration}`} />
												</ListItem>
												{idx < resources.courses.length - 1 && <Divider />}
											</React.Fragment>
										))}
									</List>
								</Box>

								<Box>
									<Typography variant="subtitle1" fontWeight={700}>Articles</Typography>
									<List dense>
										{resources.articles.map((a, idx) => (
											<React.Fragment key={a.title}>
												<ListItem secondaryAction={<Chip label="Article" size="small" />}>
													<ListItemText primary={a.title} secondary={a.provider} />
												</ListItem>
												{idx < resources.articles.length - 1 && <Divider />}
											</React.Fragment>
										))}
									</List>
								</Box>
							</Stack>
						</CardContent>
					</Card>
				</Grid>

				{/* Visual progress */}
				<Grid item xs={12} md={4}>
					<Card>
						<CardHeader title="Visual Progress" />
						<CardContent>
							<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
								<Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64, fontSize: 18 }}>{overallProgress}%</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography variant="subtitle1" fontWeight={700}>Overall Plan Completion</Typography>
									<Typography variant="body2" color="text.secondary">Progress across your active plan.</Typography>
								</Box>
							</Box>

							<LinearProgress variant="determinate" value={overallProgress} sx={{ mt: 2, height: 12, borderRadius: 6 }} />

							<Typography sx={{ mt: 2, mb: 1, color: "text.secondary" }}>Weekly Activity</Typography>
							<Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: 80 }}>
								{weeklyProgress.map((v, i) => (
									<Box key={i} sx={{ width: `${100 / weeklyProgress.length}%`, borderRadius: 1, bgcolor: i % 2 ? "#90caf9" : "#64b5f6", height: `${v}%` }} />
								))}
							</Stack>

							<Stack direction="row" spacing={1} sx={{ mt: 2 }}>
								<Button variant="contained">Continue Current Course</Button>
								<Button variant="outlined">Create Custom Plan</Button>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
