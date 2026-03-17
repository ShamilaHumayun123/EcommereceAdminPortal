USE [EcommerceDB]
GO

/****** Object:  Table [dbo].[Products]    Script Date: 3/18/2026 4:02:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Price] [decimal](10, 2) NULL,
	[Discount] [decimal](10, 2) NULL,
	[Description] [nvarchar](max) NULL,
	[CategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[Shipping] [decimal](10, 2) NULL,
	[Tax] [decimal](10, 2) NULL,
	[Tag] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Price]
GO

ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Discount]
GO

ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Shipping]
GO

ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Tax]
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([BrandId])
REFERENCES [dbo].[Brands] ([Id])
GO

ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO

