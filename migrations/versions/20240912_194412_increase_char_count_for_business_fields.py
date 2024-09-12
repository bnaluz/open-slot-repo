"""increase char count for business fields

Revision ID: e2218ed9b393
Revises: 0a3a5f96449f
Create Date: 2024-09-12 19:44:12.399491

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2218ed9b393'
down_revision = '0a3a5f96449f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=255),
               existing_nullable=False)
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('city',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('state',
               existing_type=sa.VARCHAR(length=30),
               type_=sa.String(length=100),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.alter_column('state',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('city',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('address',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)
        batch_op.alter_column('name',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=30),
               existing_nullable=False)

    # ### end Alembic commands ###
