package com.api.mapper;

import com.api.pojo.Createpsign;
import com.api.pojo.CreatepsignExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CreatepsignMapper {
    long countByExample(CreatepsignExample example);

    int deleteByExample(CreatepsignExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Createpsign record);

    int insertSelective(Createpsign record);

    List<Createpsign> selectByExample(CreatepsignExample example);

    Createpsign selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Createpsign record, @Param("example") CreatepsignExample example);

    int updateByExample(@Param("record") Createpsign record, @Param("example") CreatepsignExample example);

    int updateByPrimaryKeySelective(Createpsign record);

    int updateByPrimaryKey(Createpsign record);
}